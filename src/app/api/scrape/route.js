// app/api/scrape/route.ts or route.js
import puppeteer from "puppeteer";
import ConnectDB from "@/lib/db";
import { NextResponse } from "next/server";

// Ensure MongoDB is connected
const loadDB = async () => {
  try {
    await ConnectDB();
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

loadDB();

export const runtime = "nodejs"; // Ensure it's not edge

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto("https://thepetnest.com/adopt-a-dog", {
      waitUntil: "networkidle2",
    });

    const allPets = new Set();

    // Get total pages
    const totalPages = await page.evaluate(() => {
      const pageLinks = document.querySelectorAll('a[ng-click*="btCtrl.setPage"]');
      const pages = Array.from(pageLinks)
        .map((el) => parseInt(el.innerText))
        .filter(Number);
      return pages.length ? Math.max(...pages) : 1;
    });

    console.log(`Total Pages: ${totalPages}`);

    for (let i = 1; i <= totalPages; i++) {
      console.log(`Scraping Page: ${i}`);

      // Click on the page number
      await page.evaluate((pageNum) => {
        const pageLink = document.querySelector(`a[ng-click="btCtrl.setPage(${pageNum})"]`);
        pageLink?.click();
      }, i);

      await new Promise((resolve) => setTimeout(resolve, 3000));


      const pets = await page.evaluate(() => {
        const petElements = document.querySelectorAll(".pet__item");
        const petData = [];

        petElements.forEach((pet) => {
          petData.push({
            petName: pet.querySelector(".pet__name")?.innerText.trim() || "N/A",
            postedOn:
              pet.querySelector(".date-tag")?.innerText.replace("Posted on:", "").trim() || "N/A",
            imageUrl: pet.querySelector(".pet__image")?.src || "N/A",
            gender:
              pet.querySelector(".pet-meta-details span:nth-child(1)")?.innerText.trim() || "N/A",
            age:
              pet.querySelector(".pet-meta-details span:nth-child(3)")?.innerText.trim() || "N/A",
            location:
              pet.querySelector(".pet-meta-details:nth-child(3)")?.innerText.trim() || "N/A",
            ownerName: pet.querySelector(".owner-name b span")?.innerText.trim() || "N/A",
            adoptionLink: pet.querySelector("a.more-details-btn")?.href || "N/A",
          });
        });

        return petData;
      });

      pets.forEach((pet) => allPets.add(JSON.stringify(pet)));
    }

    await browser.close();

    const result = Array.from(allPets).map((p) => JSON.parse(p));

    return NextResponse.json({ pets: result });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
