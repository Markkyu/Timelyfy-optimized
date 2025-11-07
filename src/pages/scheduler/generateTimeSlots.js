// Generate 30-min time slots from 7:00 AM – 8:00 PM
export default function generateTimeSlots(start = 0, end = 26) {
  const slots = [];
  const baseHour = 7;

  for (let i = start; i <= end; i++) {
    const totalMinutes = i * 30;
    const hour = Math.floor(baseHour + totalMinutes / 60);
    const minutes = totalMinutes % 60 === 0 ? "00" : "30";
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    const formatted = `${displayHour}:${minutes} ${period}`;

    slots.push({
      id: i,
      time_slot: formatted,
    });
  }

  return slots;
}

// Converts day (0–4) and slot (0–26) to readable time
export function convertTime(dayIndex, slotIndex) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const baseHour = 7; // 7:00 AM start
  const totalMinutes = slotIndex * 30;
  const hour = Math.floor(baseHour + totalMinutes / 60);
  const minutes = totalMinutes % 60 === 0 ? "00" : "30";
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour;
  const formattedTime = `${displayHour}:${minutes} ${period}`;

  const dayName = days[dayIndex] || "Unknown Day";

  return `${dayName}, ${formattedTime}`;
}
