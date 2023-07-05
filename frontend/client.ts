import { createClient } from "next-sanity"

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
	apiVersion: "2022-12-17",
	//useCdn: process.env.NODE_ENV === "production",
	useCdn: false,
}

export const sanityClint = createClient(config)