# Product Requirements Document (PRD): Backrooms: No Escape Promotional Website

## 1. Product Overview

**Product Name:** *Backrooms: No Escape* Promotional Website
**Purpose:** To serve as the central marketing hub and portfolio for the 1–6 player co-op horror game. The website must capture the unsettling, liminal atmosphere of the game while driving users toward a single, primary action: visiting the Steam page to wishlist or purchase the game.
**Primary Call to Action (CTA):** [Wishlist / Play on Steam](https://store.steampowered.com/app/4294630/Backrooms_No_Escape/)

## 2. Objectives & Key Results (OKRs)

**Objective 1: Maximize Steam Conversions**
* **Key Result:** Achieve a 15%+ click-through rate (CTR) on the primary Steam CTA buttons.
* **Key Result:** Reduce bounce rate by capturing attention within the first 3 seconds using autoplaying background video or audio.

**Objective 2: Establish the Game's Identity**
* **Key Result:** Effectively communicate the core loop (co-op survival, puzzles, hostile entities) through a streamlined media gallery. 

**Objective 3: Build a Community Funnel**
* **Key Result:** Direct users not yet ready to buy toward community hubs (Discord, Twitter/X) to maintain engagement until they convert.

## 3. Target Audience

* **Co-op Horror Fans:** Players who enjoy games like *Lethal Company*, *Phasmophobia*, or other *Escape the Backrooms* iterations. They are looking for multiplayer features, proximity chat, and replayability.
* **Liminal Space & Creepypasta Enthusiasts:** Fans of the original internet lore. They value atmosphere, analog horror aesthetics, and fidelity to the source material (the hum of fluorescent lights, mono-yellow walls).

## 4. User Flow & Site Architecture 

To minimize friction and prevent users from getting lost in menus, the website should be a **single-page continuous scroll** (landing page).

### Section Breakdown (Top to Bottom)

1.  **Hero Section (The Hook):**
    * **Visual:** Full-screen, looping, muted background video showing a tense chase sequence or an eerie, empty corridor.
    * **Content:** The game logo, a brief atmospheric tagline (e.g., *"If you hear it, it already heard you."*), and a massive, glowing CTA button linking directly to Steam.
2.  **About the Game (The Pitch):**
    * **Content:** A short paragraph explaining the 1-6 player immersive psychological horror experience. 
    * **Features Grid:** 3–4 punchy bullet points with icons (e.g., *Immersive Co-op, Proximity Voice Chat, Unpredictable Entities, Unique Handcrafted Levels*).
3.  **Media Gallery (The Proof):**
    * **Content:** A carousel or grid of 4–6 high-quality screenshots and an embedded YouTube trailer. 
4.  **System Requirements (The Specs):**
    * **Content:** A clean, simple table detailing Minimum and Recommended PC specs so users know they can run it before clicking through.
5.  **Footer (The Net):**
    * **Content:** A secondary Steam CTA, links to social media (Discord, YouTube, X), Press Kit download link, and copyright information.

## 5. Design & Aesthetic Guidelines

The website's UI/UX must directly mirror the feeling of being trapped in the game.

* **Color Palette:** Monochromatic yellows (hex `#D1C78D`, `#E5D98B`), dingy beige, stark blacks, and high-contrast whites for text readability.
* **Typography:** A monospaced font for headings (e.g., *VCR OSD Mono* or *Courier New*) to evoke analog tech, paired with a clean sans-serif for body text to ensure readability on mobile.
* **Audio (Optional but recommended):** A subtle, continuous hum of fluorescent lights that plays upon user interaction (with a clear mute button).
* **Visual Effects:** Slight VHS tracking lines, subtle chromatic aberration on hover states, and flickering animations on the Steam CTA buttons to draw the eye.

## 6. Technical Requirements

| Requirement | Description |
| :--- | :--- |
| **Responsiveness** | Mobile-first design. The hero video must degrade gracefully to a static image on low-bandwidth mobile connections. |
| **Performance** | Load time under 2.5 seconds. All images must be compressed (WebP format), and background videos must be heavily optimized. |
| **SEO** | Meta title: *Backrooms: No Escape \| 1-6 Player Co-op Horror Game*. Meta description must include keywords: multiplayer, liminal space, horror, Steam. |
| **Tracking** | Google Analytics and Meta Pixel integration to track user origin and CTRs on the Steam outbound link. |
