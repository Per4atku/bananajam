import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(bandName: string): string {
  return bandName
    .split(" ") // Split the name by spaces
    .map((word) => word.charAt(0)) // Get the first character of each word
    .join("") // Join the characters to form the initials
    .toUpperCase() // Convert the initials to uppercase
    .slice(0, 2); // Ensure the output has a maximum of 2 letters
}
