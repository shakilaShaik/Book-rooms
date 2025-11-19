
import { minutesBetween } from "./timeconversion";
import { computePeakMinutes } from "./peakMinutes";

export function computePrice(
  start: Date,
  end: Date,
  baseHourly: number
) {
  const totalMinutes = minutesBetween(start, end);
  const peakMinutes = computePeakMinutes(start, end);
  const offPeakMinutes = totalMinutes - peakMinutes;

  const peakHours = peakMinutes / 60;
  const offPeakHours = offPeakMinutes / 60;

  return (peakHours * 1.5 * baseHourly) + (offPeakHours * baseHourly);
}
