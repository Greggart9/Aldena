import db from "./db.json";

const API_BASE_URL = process.env.NEXT_PUBLIC_JSON_SERVER_URL || "http://localhost:3001";

/**
 * Fetch projects collection from JSON Server endpoint
 */
export async function fetchProjectsEndpoint() {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("JSON server endpoint unavailable, using local db.json for projects:", err);
    return db.projects;
  }
}

/**
 * Fetch team collection from JSON Server endpoint
 */
export async function fetchTeamEndpoint() {
  try {
    const res = await fetch(`${API_BASE_URL}/team`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("JSON server endpoint unavailable, using local db.json for team:", err);
    return db.team;
  }
}

/**
 * Fetch services collection from JSON Server endpoint
 */
export async function fetchServicesEndpoint() {
  try {
    const res = await fetch(`${API_BASE_URL}/services`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("JSON server endpoint unavailable, using local db.json for services:", err);
    return db.services;
  }
}

/**
 * Fetch reviews collection from JSON Server endpoint
 */
export async function fetchReviewsEndpoint() {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("JSON server endpoint unavailable, using local db.json for reviews:", err);
    return db.reviews;
  }
}

/**
 * Fetch process steps from JSON Server endpoint
 */
export async function fetchProcessEndpoint() {
  try {
    const res = await fetch(`${API_BASE_URL}/process`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("JSON server endpoint unavailable, using local db.json for process:", err);
    return db.process;
  }
}

/**
 * Fetch FAQs from JSON Server endpoint
 */
export async function fetchFaqsEndpoint() {
  try {
    const res = await fetch(`${API_BASE_URL}/faqs`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("JSON server endpoint unavailable, using local db.json for faqs:", err);
    return db.faqs;
  }
}
