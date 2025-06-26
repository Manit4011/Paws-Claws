import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const targetUrl = "https://thepetnest.com/adopt-a-dog";
    const scraperUrl = `https://api.scraperapi.com?api_key=9c21b2984ad7a6c82676e4b27d3db2e9&url=${encodeURIComponent(targetUrl)}`;

    const { data: html } = await axios.get(scraperUrl);
    const $ = cheerio.load(html);

    const pets = [];

    $(".pet__item").each((_, el) => {
      const pet = $(el);

      // ✅ Safely construct image URL
      let imageUrl = pet.find(".pet__image").attr("src") || "";
      if (imageUrl && !imageUrl.startsWith("http")) {
        imageUrl = `https://thepetnest.com${imageUrl}`;
      }

      pets.push({
        petName: pet.find(".pet__name").text().trim() || "N/A",
        postedOn: pet.find(".date-tag").text().replace("Posted on:", "").trim() || "N/A",
        imageUrl: imageUrl || null, // ensure it's valid
        gender: pet.find(".pet-meta-details span").eq(0).text().trim() || "N/A",
        age: pet.find(".pet-meta-details span").eq(2).text().trim() || "N/A",
        location: pet.find(".pet-meta-details").eq(2).text().trim() || "N/A",
        ownerName: pet.find(".owner-name b span").text().trim() || "N/A",
        adoptionLink: pet.find("a.more-details-btn").attr("href") || "N/A",
      });
    });

    return NextResponse.json({ pets });
  } catch (err) {
    console.error("Scraping error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
