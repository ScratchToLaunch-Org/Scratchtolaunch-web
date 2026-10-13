export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatINRFrom(amount: number) {
  return `${formatINR(amount)}+`
}

export function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function greetingForHour(hour: number) {
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export function formatCompactINR(amount: number) {
  if (amount >= 100000) {
    const lakhs = amount / 100000
    const digits = lakhs >= 10 ? 1 : 1
    return `₹${lakhs.toFixed(digits).replace(/\.0$/, "")}L`
  }
  if (amount >= 10000) {
    return `₹${Math.round(amount / 1000)}K`
  }
  return formatINR(amount)
}

export function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })
}
