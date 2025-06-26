// app/api/scrape/route.ts or route.js
import puppeteer from "puppeteer";
import ConnectDB from "@/lib/db";
import { NextResponse } from "next/server";

const loadDB = async () => {
  try {
    await ConnectDB();
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

loadDB();

export const runtime = "nodejs";

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

    await browser.close();

    return NextResponse.json({ pets });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}