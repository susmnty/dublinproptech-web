"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICE_AREAS } from "@/app/lib/seo";
import { submitEnquiry } from "@/app/lib/hubspot";

const CONTACT = "/service/contact";
const hrefFor = (area: string) => `${CONTACT}?area=${encodeURIComponent(area)}#enquiry`;

const messageFor = (area: string, request: boolean) =>
  request
    ? `Hi, I'm based in ${area}. Do you cover this area? I'm interested in: `
    : `Hi, I'd like to book a service in ${area}. I'm interested in: `;

// Already on the contact page? The page doesn't reload on a link click, so fill the form directly.
function fillContactForm(area: string, request: boolean) {
  const box = document.getElementById("message") as HTMLTextAreaElement | null;
  if (!box) return false;
  // Replace an earlier auto-filled message, but never overwrite what the visitor typed
  if (!box.value.trim() || box.value.startsWith("Hi, I")) box.value = messageFor(area, request);
  history.replaceState(null, "", `${CONTACT}?area=${encodeURIComponent(area)}${request ? "&request=1" : ""}#enquiry`);
  document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => { box.focus({ preventScroll: true }); box.setSelectionRange(box.value.length, box.value.length); }, 400);
  return true;
}

// One handler for list rows and map pins
function useGoToArea() {
  const router = useRouter();
  const pathname = usePathname();
  return (area: string, request = false) => {
    if (pathname === CONTACT && fillContactForm(area, request)) return;
    router.push(`${CONTACT}?area=${encodeURIComponent(area)}${request ? "&request=1" : ""}#enquiry`);
  };
}

// Island of Ireland, generated from Natural Earth coastline data (Mercator, viewBox 0 0 400 500)
const IRELAND_SHAPE = "M58.0,196.5L57.7,200.0L52.4,195.6L49.8,191.1L35.7,188.8L41.5,184.2L44.5,185.4L54.7,185.7L57.4,187.7ZM250.0,53.6L238.8,61.5L237.3,64.5L234.0,76.6L233.8,80.0L230.2,86.3L226.7,93.3L222.9,96.1L216.8,98.2L213.5,100.3L209.5,99.3L204.1,99.5L201.3,101.8L201.6,103.7L203.1,105.8L207.7,109.0L213.0,111.9L212.5,114.5L209.7,117.2L192.0,124.4L186.7,128.8L184.9,131.5L186.7,136.4L200.8,150.6L203.1,152.1L205.4,160.2L217.8,163.8L222.9,169.0L227.2,170.0L236.6,169.6L240.4,171.7L242.6,170.2L243.9,167.5L251.8,160.4L254.5,157.3L253.0,153.1L251.3,150.0L256.1,143.5L261.9,137.0L264.9,137.2L270.0,141.2L274.1,146.6L274.6,150.8L275.3,154.0L279.4,160.4L281.9,162.7L288.7,164.0L290.3,166.5L289.0,176.1L290.0,179.2L297.4,179.2L305.0,178.6L307.5,178.8L310.3,176.9L314.6,174.8L320.4,175.5L323.5,179.8L324.7,184.2L319.7,185.7L314.1,184.8L311.5,187.7L311.3,193.1L313.3,200.2L316.9,205.2L319.7,216.5L322.2,228.9L325.7,236.5L326.5,245.8L326.0,250.3L326.7,258.5L325.2,261.4L326.2,269.1L330.8,285.1L332.6,293.8L333.8,312.9L330.8,320.2L326.7,326.9L324.0,334.9L321.9,343.6L320.7,357.7L311.5,373.9L307.7,377.9L303.2,380.5L313.1,391.7L305.0,396.9L296.3,398.5L286.7,395.7L280.9,395.9L275.3,399.7L273.3,401.9L271.5,400.7L268.0,391.5L265.2,401.1L259.6,404.1L250.2,403.5L234.5,406.1L228.5,408.9L225.9,413.0L223.9,418.0L221.4,420.8L218.6,422.4L206.4,425.9L204.1,427.5L198.3,435.4L191.0,440.0L184.9,441.4L179.6,436.8L177.3,434.0L174.7,432.5L166.4,432.9L168.9,434.2L170.7,437.4L171.4,443.7L170.4,449.9L166.4,452.8L161.6,453.4L153.7,459.7L143.3,461.5L137.8,467.4L103.8,477.2L102.0,477.2L97.2,474.7L92.2,473.7L87.1,474.5L72.9,480L65.8,478.8L74.7,465.2L86.6,458.3L87.8,456.4L83.8,455.6L61.5,460.3L53.6,464.4L45.8,465.6L49.3,459.3L59.5,450.8L64.8,446.7L68.3,445.1L71.9,440.2L82.5,434.4L48.3,446.1L39.5,444.7L37.4,441.6L30.3,442.9L27.8,435.0L37.9,423.0L44.0,417.8L51.4,415.0L58.2,411.0L60.7,406.1L57.4,404.5L36.7,405.7L26.8,404.7L27.3,400.7L29.3,396.3L39.5,388.9L45.0,387.7L50.1,388.5L54.9,390.3L58.7,392.9L70.4,391.3L65.6,386.7L64.8,376.9L61.0,373.7L65.8,369.3L71.1,366.5L80.2,357.1L83.5,355.7L101.5,353.5L120.8,348.6L140.0,341.8L130.2,338.0L125.3,332.9L117.7,343.2L112.4,347.0L97.0,349.0L92.2,347.8L85.3,344.8L83.0,346.0L81.0,348.4L70.9,353.3L60.2,354.5L72.6,345.4L88.4,330.1L91.9,325.0L97.0,316.5L95.4,312.9L92.2,310.7L103.6,293.0L107.6,289.9L115.0,289.3L120.5,286.5L122.8,286.5L124.8,285.5L129.6,280.2L122.3,276.9L115.0,275.1L91.6,276.9L88.6,276.5L85.6,274.9L83.8,272.6L82.3,266.5L80.8,265.3L75.4,265.3L70.4,267.1L66.6,266.9L63.0,264.2L68.8,258.1L61.5,256.7L54.2,257.9L47.8,256.0L47.8,252.1L50.6,248.2L46.8,244.5L46.0,239.8L50.1,237.6L54.2,238.4L63.0,234.9L73.9,233.2L64.5,229.9L60.7,227.1L60.5,222.5L61.2,218.8L72.4,212.2L84.0,209.5L83.0,205.2L84.0,200.6L72.1,199.1L60.5,202.5L61.8,193.5L64.5,185.7L65.0,180.5L64.5,174.8L59.0,177.1L58.2,169.2L55.9,163.8L47.8,167.5L48.1,160.2L50.4,155.2L54.7,152.9L59.0,154.0L66.6,154.0L74.2,150.0L85.1,149.1L102.5,150.2L114.4,161.1L117.5,159.2L122.3,152.3L124.6,151.7L142.6,154.6L153.7,158.3L156.8,157.1L155.0,149.8L151.2,144.5L156.0,137.6L161.8,133.0L165.9,130.7L175.0,127.7L178.8,125.0L181.6,116.2L185.6,108.8L162.8,112.6L141.3,103.9L144.8,97.8L149.4,94.2L157.3,91.4L158.0,88.3L161.8,85.5L168.4,78.5L166.1,69.4L167.4,62.5L172.2,58.1L173.7,51.7L175.8,47.0L185.4,45.2L194.8,41.0L198.1,41.4L208.9,40.3L212.7,42.0L211.7,34.3L218.6,33.5L221.1,35.0L222.4,40.3L225.4,44.0L226.2,50.0L224.1,54.6L220.9,58.3L223.9,61.9L219.1,68.5L224.4,65.7L231.7,59.1L231.5,53.8L230.2,47.2L227.9,41.2L229.0,34.5L233.3,30.3L244.2,28.1L239.6,20.6L243.7,20L248.2,21.5L254.5,27.5L261.1,32.0L268.2,35.6L261.4,43.1L253.3,48.0ZM320.4,175.5L314.6,174.8L310.3,176.9L307.5,178.8L305.0,178.6L297.4,179.2L290.0,179.2L289.0,176.1L290.3,166.5L288.7,164.0L281.9,162.7L279.4,160.4L275.3,154.0L274.6,150.8L274.1,146.6L270.0,141.2L264.9,137.2L261.9,137.0L256.1,143.5L251.3,150.0L253.0,153.1L254.5,157.3L251.8,160.4L243.9,167.5L242.6,170.2L240.4,171.7L236.6,169.6L227.2,170.0L222.9,169.0L217.8,163.8L205.4,160.2L203.1,152.1L200.8,150.6L186.7,136.4L184.9,131.5L186.7,128.8L192.0,124.4L209.7,117.2L212.5,114.5L213.0,111.9L207.7,109.0L203.1,105.8L201.6,103.7L201.3,101.8L204.1,99.5L209.5,99.3L213.5,100.3L216.8,98.2L222.9,96.1L226.7,93.3L230.2,86.3L233.8,80.0L234.0,76.6L237.3,64.5L238.8,61.5L250.0,53.6L252.8,58.1L258.3,59.1L263.4,55.1L269.2,42.5L273.3,41.8L277.9,42.7L286.7,41.2L302.4,35.4L309.5,35.2L319.4,38.2L326.7,38.2L333.3,47.2L336.9,61.3L345.0,75.3L355.9,87.4L356.1,94.6L352.3,98.6L344.2,103.5L344.5,108.8L349.5,106.0L354.1,105.0L365.3,106.0L369.1,111.5L371.6,119.3L373.1,125.8L372.1,133.0L369.3,130.7L366.3,124.4L363.0,121.4L358.9,120.0L360.7,128.6L359.9,140.3L361.7,141.4L367.0,141.6L363.5,153.3L356.4,156.7L348.0,157.9L346.0,162.1L344.5,167.5L340.2,175.5L334.6,180.0L327.5,179.2Z";
const IRELAND_DOTS = "M235.0 30.0h0M245.0 30.0h0M255.0 30.0h0M220.0 40.0h0M230.0 40.0h0M240.0 40.0h0M250.0 40.0h0M260.0 40.0h0M300.0 40.0h0M310.0 40.0h0M320.0 40.0h0M175.0 50.0h0M185.0 50.0h0M195.0 50.0h0M205.0 50.0h0M215.0 50.0h0M225.0 50.0h0M235.0 50.0h0M245.0 50.0h0M275.0 50.0h0M285.0 50.0h0M295.0 50.0h0M305.0 50.0h0M315.0 50.0h0M325.0 50.0h0M180.0 60.0h0M190.0 60.0h0M200.0 60.0h0M210.0 60.0h0M220.0 60.0h0M240.0 60.0h0M250.0 60.0h0M260.0 60.0h0M270.0 60.0h0M280.0 60.0h0M290.0 60.0h0M300.0 60.0h0M310.0 60.0h0M320.0 60.0h0M330.0 60.0h0M175.0 70.0h0M185.0 70.0h0M195.0 70.0h0M205.0 70.0h0M215.0 70.0h0M225.0 70.0h0M235.0 70.0h0M245.0 70.0h0M255.0 70.0h0M265.0 70.0h0M275.0 70.0h0M285.0 70.0h0M295.0 70.0h0M305.0 70.0h0M315.0 70.0h0M325.0 70.0h0M335.0 70.0h0M170.0 80.0h0M180.0 80.0h0M190.0 80.0h0M200.0 80.0h0M210.0 80.0h0M220.0 80.0h0M230.0 80.0h0M240.0 80.0h0M250.0 80.0h0M260.0 80.0h0M270.0 80.0h0M280.0 80.0h0M290.0 80.0h0M300.0 80.0h0M310.0 80.0h0M320.0 80.0h0M330.0 80.0h0M340.0 80.0h0M165.0 90.0h0M175.0 90.0h0M185.0 90.0h0M195.0 90.0h0M205.0 90.0h0M215.0 90.0h0M225.0 90.0h0M235.0 90.0h0M245.0 90.0h0M255.0 90.0h0M265.0 90.0h0M275.0 90.0h0M285.0 90.0h0M295.0 90.0h0M305.0 90.0h0M315.0 90.0h0M325.0 90.0h0M335.0 90.0h0M345.0 90.0h0M355.0 90.0h0M150.0 100.0h0M160.0 100.0h0M170.0 100.0h0M180.0 100.0h0M190.0 100.0h0M200.0 100.0h0M210.0 100.0h0M220.0 100.0h0M230.0 100.0h0M240.0 100.0h0M250.0 100.0h0M260.0 100.0h0M270.0 100.0h0M280.0 100.0h0M290.0 100.0h0M300.0 100.0h0M310.0 100.0h0M320.0 100.0h0M330.0 100.0h0M340.0 100.0h0M350.0 100.0h0M165.0 110.0h0M175.0 110.0h0M195.0 110.0h0M205.0 110.0h0M215.0 110.0h0M225.0 110.0h0M235.0 110.0h0M245.0 110.0h0M255.0 110.0h0M265.0 110.0h0M275.0 110.0h0M285.0 110.0h0M295.0 110.0h0M305.0 110.0h0M315.0 110.0h0M325.0 110.0h0M335.0 110.0h0M345.0 110.0h0M355.0 110.0h0M365.0 110.0h0M190.0 120.0h0M200.0 120.0h0M210.0 120.0h0M220.0 120.0h0M230.0 120.0h0M240.0 120.0h0M250.0 120.0h0M260.0 120.0h0M270.0 120.0h0M280.0 120.0h0M290.0 120.0h0M300.0 120.0h0M310.0 120.0h0M320.0 120.0h0M330.0 120.0h0M340.0 120.0h0M350.0 120.0h0M360.0 120.0h0M370.0 120.0h0M175.0 130.0h0M185.0 130.0h0M195.0 130.0h0M205.0 130.0h0M215.0 130.0h0M225.0 130.0h0M235.0 130.0h0M245.0 130.0h0M255.0 130.0h0M265.0 130.0h0M275.0 130.0h0M285.0 130.0h0M295.0 130.0h0M305.0 130.0h0M315.0 130.0h0M325.0 130.0h0M335.0 130.0h0M345.0 130.0h0M355.0 130.0h0M160.0 140.0h0M170.0 140.0h0M180.0 140.0h0M190.0 140.0h0M200.0 140.0h0M210.0 140.0h0M220.0 140.0h0M230.0 140.0h0M240.0 140.0h0M250.0 140.0h0M260.0 140.0h0M270.0 140.0h0M280.0 140.0h0M290.0 140.0h0M300.0 140.0h0M310.0 140.0h0M320.0 140.0h0M330.0 140.0h0M340.0 140.0h0M350.0 140.0h0M360.0 140.0h0M75.0 150.0h0M85.0 150.0h0M95.0 150.0h0M165.0 150.0h0M175.0 150.0h0M185.0 150.0h0M195.0 150.0h0M205.0 150.0h0M215.0 150.0h0M225.0 150.0h0M235.0 150.0h0M245.0 150.0h0M255.0 150.0h0M265.0 150.0h0M275.0 150.0h0M285.0 150.0h0M295.0 150.0h0M305.0 150.0h0M315.0 150.0h0M325.0 150.0h0M335.0 150.0h0M345.0 150.0h0M355.0 150.0h0M50.0 160.0h0M60.0 160.0h0M70.0 160.0h0M80.0 160.0h0M90.0 160.0h0M100.0 160.0h0M110.0 160.0h0M120.0 160.0h0M130.0 160.0h0M140.0 160.0h0M150.0 160.0h0M160.0 160.0h0M170.0 160.0h0M180.0 160.0h0M190.0 160.0h0M200.0 160.0h0M210.0 160.0h0M220.0 160.0h0M230.0 160.0h0M240.0 160.0h0M250.0 160.0h0M260.0 160.0h0M270.0 160.0h0M280.0 160.0h0M290.0 160.0h0M300.0 160.0h0M310.0 160.0h0M320.0 160.0h0M330.0 160.0h0M340.0 160.0h0M65.0 170.0h0M75.0 170.0h0M85.0 170.0h0M95.0 170.0h0M105.0 170.0h0M115.0 170.0h0M125.0 170.0h0M135.0 170.0h0M145.0 170.0h0M155.0 170.0h0M165.0 170.0h0M175.0 170.0h0M185.0 170.0h0M195.0 170.0h0M205.0 170.0h0M215.0 170.0h0M225.0 170.0h0M235.0 170.0h0M245.0 170.0h0M255.0 170.0h0M265.0 170.0h0M275.0 170.0h0M285.0 170.0h0M295.0 170.0h0M305.0 170.0h0M315.0 170.0h0M325.0 170.0h0M335.0 170.0h0M70.0 180.0h0M80.0 180.0h0M90.0 180.0h0M100.0 180.0h0M110.0 180.0h0M120.0 180.0h0M130.0 180.0h0M140.0 180.0h0M150.0 180.0h0M160.0 180.0h0M170.0 180.0h0M180.0 180.0h0M190.0 180.0h0M200.0 180.0h0M210.0 180.0h0M220.0 180.0h0M230.0 180.0h0M240.0 180.0h0M250.0 180.0h0M260.0 180.0h0M270.0 180.0h0M280.0 180.0h0M290.0 180.0h0M300.0 180.0h0M310.0 180.0h0M320.0 180.0h0M45.0 190.0h0M55.0 190.0h0M65.0 190.0h0M75.0 190.0h0M85.0 190.0h0M95.0 190.0h0M105.0 190.0h0M115.0 190.0h0M125.0 190.0h0M135.0 190.0h0M145.0 190.0h0M155.0 190.0h0M165.0 190.0h0M175.0 190.0h0M185.0 190.0h0M195.0 190.0h0M205.0 190.0h0M215.0 190.0h0M225.0 190.0h0M235.0 190.0h0M245.0 190.0h0M255.0 190.0h0M265.0 190.0h0M275.0 190.0h0M285.0 190.0h0M295.0 190.0h0M305.0 190.0h0M80.0 200.0h0M90.0 200.0h0M100.0 200.0h0M110.0 200.0h0M120.0 200.0h0M130.0 200.0h0M140.0 200.0h0M150.0 200.0h0M160.0 200.0h0M170.0 200.0h0M180.0 200.0h0M190.0 200.0h0M200.0 200.0h0M210.0 200.0h0M220.0 200.0h0M230.0 200.0h0M240.0 200.0h0M250.0 200.0h0M260.0 200.0h0M270.0 200.0h0M280.0 200.0h0M290.0 200.0h0M300.0 200.0h0M310.0 200.0h0M85.0 210.0h0M95.0 210.0h0M105.0 210.0h0M115.0 210.0h0M125.0 210.0h0M135.0 210.0h0M145.0 210.0h0M155.0 210.0h0M165.0 210.0h0M175.0 210.0h0M185.0 210.0h0M195.0 210.0h0M205.0 210.0h0M215.0 210.0h0M225.0 210.0h0M235.0 210.0h0M245.0 210.0h0M255.0 210.0h0M265.0 210.0h0M275.0 210.0h0M285.0 210.0h0M295.0 210.0h0M305.0 210.0h0M315.0 210.0h0M70.0 220.0h0M80.0 220.0h0M90.0 220.0h0M100.0 220.0h0M110.0 220.0h0M120.0 220.0h0M130.0 220.0h0M140.0 220.0h0M150.0 220.0h0M160.0 220.0h0M170.0 220.0h0M180.0 220.0h0M190.0 220.0h0M200.0 220.0h0M210.0 220.0h0M220.0 220.0h0M230.0 220.0h0M240.0 220.0h0M250.0 220.0h0M260.0 220.0h0M270.0 220.0h0M280.0 220.0h0M290.0 220.0h0M300.0 220.0h0M310.0 220.0h0M320.0 220.0h0M65.0 230.0h0M75.0 230.0h0M85.0 230.0h0M95.0 230.0h0M105.0 230.0h0M115.0 230.0h0M125.0 230.0h0M135.0 230.0h0M145.0 230.0h0M155.0 230.0h0M165.0 230.0h0M175.0 230.0h0M185.0 230.0h0M195.0 230.0h0M205.0 230.0h0M215.0 230.0h0M225.0 230.0h0M235.0 230.0h0M245.0 230.0h0M255.0 230.0h0M265.0 230.0h0M275.0 230.0h0M285.0 230.0h0M295.0 230.0h0M305.0 230.0h0M315.0 230.0h0M50.0 240.0h0M60.0 240.0h0M70.0 240.0h0M80.0 240.0h0M90.0 240.0h0M100.0 240.0h0M110.0 240.0h0M120.0 240.0h0M130.0 240.0h0M140.0 240.0h0M150.0 240.0h0M160.0 240.0h0M170.0 240.0h0M180.0 240.0h0M190.0 240.0h0M200.0 240.0h0M210.0 240.0h0M220.0 240.0h0M230.0 240.0h0M240.0 240.0h0M250.0 240.0h0M260.0 240.0h0M270.0 240.0h0M280.0 240.0h0M290.0 240.0h0M300.0 240.0h0M310.0 240.0h0M320.0 240.0h0M55.0 250.0h0M65.0 250.0h0M75.0 250.0h0M85.0 250.0h0M95.0 250.0h0M105.0 250.0h0M115.0 250.0h0M125.0 250.0h0M135.0 250.0h0M145.0 250.0h0M155.0 250.0h0M165.0 250.0h0M175.0 250.0h0M185.0 250.0h0M195.0 250.0h0M205.0 250.0h0M215.0 250.0h0M225.0 250.0h0M235.0 250.0h0M245.0 250.0h0M255.0 250.0h0M265.0 250.0h0M275.0 250.0h0M285.0 250.0h0M295.0 250.0h0M305.0 250.0h0M315.0 250.0h0M325.0 250.0h0M70.0 260.0h0M80.0 260.0h0M90.0 260.0h0M100.0 260.0h0M110.0 260.0h0M120.0 260.0h0M130.0 260.0h0M140.0 260.0h0M150.0 260.0h0M160.0 260.0h0M170.0 260.0h0M180.0 260.0h0M190.0 260.0h0M200.0 260.0h0M210.0 260.0h0M220.0 260.0h0M230.0 260.0h0M240.0 260.0h0M250.0 260.0h0M260.0 260.0h0M270.0 260.0h0M280.0 260.0h0M290.0 260.0h0M300.0 260.0h0M310.0 260.0h0M320.0 260.0h0M85.0 270.0h0M95.0 270.0h0M105.0 270.0h0M115.0 270.0h0M125.0 270.0h0M135.0 270.0h0M145.0 270.0h0M155.0 270.0h0M165.0 270.0h0M175.0 270.0h0M185.0 270.0h0M195.0 270.0h0M205.0 270.0h0M215.0 270.0h0M225.0 270.0h0M235.0 270.0h0M245.0 270.0h0M255.0 270.0h0M265.0 270.0h0M275.0 270.0h0M285.0 270.0h0M295.0 270.0h0M305.0 270.0h0M315.0 270.0h0M325.0 270.0h0M130.0 280.0h0M140.0 280.0h0M150.0 280.0h0M160.0 280.0h0M170.0 280.0h0M180.0 280.0h0M190.0 280.0h0M200.0 280.0h0M210.0 280.0h0M220.0 280.0h0M230.0 280.0h0M240.0 280.0h0M250.0 280.0h0M260.0 280.0h0M270.0 280.0h0M280.0 280.0h0M290.0 280.0h0M300.0 280.0h0M310.0 280.0h0M320.0 280.0h0M115.0 290.0h0M125.0 290.0h0M135.0 290.0h0M145.0 290.0h0M155.0 290.0h0M165.0 290.0h0M175.0 290.0h0M185.0 290.0h0M195.0 290.0h0M205.0 290.0h0M215.0 290.0h0M225.0 290.0h0M235.0 290.0h0M245.0 290.0h0M255.0 290.0h0M265.0 290.0h0M275.0 290.0h0M285.0 290.0h0M295.0 290.0h0M305.0 290.0h0M315.0 290.0h0M325.0 290.0h0M100.0 300.0h0M110.0 300.0h0M120.0 300.0h0M130.0 300.0h0M140.0 300.0h0M150.0 300.0h0M160.0 300.0h0M170.0 300.0h0M180.0 300.0h0M190.0 300.0h0M200.0 300.0h0M210.0 300.0h0M220.0 300.0h0M230.0 300.0h0M240.0 300.0h0M250.0 300.0h0M260.0 300.0h0M270.0 300.0h0M280.0 300.0h0M290.0 300.0h0M300.0 300.0h0M310.0 300.0h0M320.0 300.0h0M330.0 300.0h0M95.0 310.0h0M105.0 310.0h0M115.0 310.0h0M125.0 310.0h0M135.0 310.0h0M145.0 310.0h0M155.0 310.0h0M165.0 310.0h0M175.0 310.0h0M185.0 310.0h0M195.0 310.0h0M205.0 310.0h0M215.0 310.0h0M225.0 310.0h0M235.0 310.0h0M245.0 310.0h0M255.0 310.0h0M265.0 310.0h0M275.0 310.0h0M285.0 310.0h0M295.0 310.0h0M305.0 310.0h0M315.0 310.0h0M325.0 310.0h0M100.0 320.0h0M110.0 320.0h0M120.0 320.0h0M130.0 320.0h0M140.0 320.0h0M150.0 320.0h0M160.0 320.0h0M170.0 320.0h0M180.0 320.0h0M190.0 320.0h0M200.0 320.0h0M210.0 320.0h0M220.0 320.0h0M230.0 320.0h0M240.0 320.0h0M250.0 320.0h0M260.0 320.0h0M270.0 320.0h0M280.0 320.0h0M290.0 320.0h0M300.0 320.0h0M310.0 320.0h0M320.0 320.0h0M330.0 320.0h0M95.0 330.0h0M105.0 330.0h0M115.0 330.0h0M125.0 330.0h0M135.0 330.0h0M145.0 330.0h0M155.0 330.0h0M165.0 330.0h0M175.0 330.0h0M185.0 330.0h0M195.0 330.0h0M205.0 330.0h0M215.0 330.0h0M225.0 330.0h0M235.0 330.0h0M245.0 330.0h0M255.0 330.0h0M265.0 330.0h0M275.0 330.0h0M285.0 330.0h0M295.0 330.0h0M305.0 330.0h0M315.0 330.0h0M325.0 330.0h0M80.0 340.0h0M90.0 340.0h0M100.0 340.0h0M110.0 340.0h0M120.0 340.0h0M140.0 340.0h0M150.0 340.0h0M160.0 340.0h0M170.0 340.0h0M180.0 340.0h0M190.0 340.0h0M200.0 340.0h0M210.0 340.0h0M220.0 340.0h0M230.0 340.0h0M240.0 340.0h0M250.0 340.0h0M260.0 340.0h0M270.0 340.0h0M280.0 340.0h0M290.0 340.0h0M300.0 340.0h0M310.0 340.0h0M320.0 340.0h0M75.0 350.0h0M125.0 350.0h0M135.0 350.0h0M145.0 350.0h0M155.0 350.0h0M165.0 350.0h0M175.0 350.0h0M185.0 350.0h0M195.0 350.0h0M205.0 350.0h0M215.0 350.0h0M225.0 350.0h0M235.0 350.0h0M245.0 350.0h0M255.0 350.0h0M265.0 350.0h0M275.0 350.0h0M285.0 350.0h0M295.0 350.0h0M305.0 350.0h0M315.0 350.0h0M80.0 360.0h0M90.0 360.0h0M100.0 360.0h0M110.0 360.0h0M120.0 360.0h0M130.0 360.0h0M140.0 360.0h0M150.0 360.0h0M160.0 360.0h0M170.0 360.0h0M180.0 360.0h0M190.0 360.0h0M200.0 360.0h0M210.0 360.0h0M220.0 360.0h0M230.0 360.0h0M240.0 360.0h0M250.0 360.0h0M260.0 360.0h0M270.0 360.0h0M280.0 360.0h0M290.0 360.0h0M300.0 360.0h0M310.0 360.0h0M75.0 370.0h0M85.0 370.0h0M95.0 370.0h0M105.0 370.0h0M115.0 370.0h0M125.0 370.0h0M135.0 370.0h0M145.0 370.0h0M155.0 370.0h0M165.0 370.0h0M175.0 370.0h0M185.0 370.0h0M195.0 370.0h0M205.0 370.0h0M215.0 370.0h0M225.0 370.0h0M235.0 370.0h0M245.0 370.0h0M255.0 370.0h0M265.0 370.0h0M275.0 370.0h0M285.0 370.0h0M295.0 370.0h0M305.0 370.0h0M70.0 380.0h0M80.0 380.0h0M90.0 380.0h0M100.0 380.0h0M110.0 380.0h0M120.0 380.0h0M130.0 380.0h0M140.0 380.0h0M150.0 380.0h0M160.0 380.0h0M170.0 380.0h0M180.0 380.0h0M190.0 380.0h0M200.0 380.0h0M210.0 380.0h0M220.0 380.0h0M230.0 380.0h0M240.0 380.0h0M250.0 380.0h0M260.0 380.0h0M270.0 380.0h0M280.0 380.0h0M290.0 380.0h0M300.0 380.0h0M45.0 390.0h0M75.0 390.0h0M85.0 390.0h0M95.0 390.0h0M105.0 390.0h0M115.0 390.0h0M125.0 390.0h0M135.0 390.0h0M145.0 390.0h0M155.0 390.0h0M165.0 390.0h0M175.0 390.0h0M185.0 390.0h0M195.0 390.0h0M205.0 390.0h0M215.0 390.0h0M225.0 390.0h0M235.0 390.0h0M245.0 390.0h0M255.0 390.0h0M265.0 390.0h0M275.0 390.0h0M285.0 390.0h0M295.0 390.0h0M305.0 390.0h0M30.0 400.0h0M40.0 400.0h0M50.0 400.0h0M60.0 400.0h0M70.0 400.0h0M80.0 400.0h0M90.0 400.0h0M100.0 400.0h0M110.0 400.0h0M120.0 400.0h0M130.0 400.0h0M140.0 400.0h0M150.0 400.0h0M160.0 400.0h0M170.0 400.0h0M180.0 400.0h0M190.0 400.0h0M200.0 400.0h0M210.0 400.0h0M220.0 400.0h0M230.0 400.0h0M240.0 400.0h0M250.0 400.0h0M260.0 400.0h0M65.0 410.0h0M75.0 410.0h0M85.0 410.0h0M95.0 410.0h0M105.0 410.0h0M115.0 410.0h0M125.0 410.0h0M135.0 410.0h0M145.0 410.0h0M155.0 410.0h0M165.0 410.0h0M175.0 410.0h0M185.0 410.0h0M195.0 410.0h0M205.0 410.0h0M215.0 410.0h0M225.0 410.0h0M50.0 420.0h0M60.0 420.0h0M70.0 420.0h0M80.0 420.0h0M90.0 420.0h0M100.0 420.0h0M110.0 420.0h0M120.0 420.0h0M130.0 420.0h0M140.0 420.0h0M150.0 420.0h0M160.0 420.0h0M170.0 420.0h0M180.0 420.0h0M190.0 420.0h0M200.0 420.0h0M210.0 420.0h0M220.0 420.0h0M35.0 430.0h0M45.0 430.0h0M55.0 430.0h0M65.0 430.0h0M75.0 430.0h0M85.0 430.0h0M95.0 430.0h0M105.0 430.0h0M115.0 430.0h0M125.0 430.0h0M135.0 430.0h0M145.0 430.0h0M155.0 430.0h0M165.0 430.0h0M175.0 430.0h0M185.0 430.0h0M195.0 430.0h0M30.0 440.0h0M40.0 440.0h0M50.0 440.0h0M60.0 440.0h0M80.0 440.0h0M90.0 440.0h0M100.0 440.0h0M110.0 440.0h0M120.0 440.0h0M130.0 440.0h0M140.0 440.0h0M150.0 440.0h0M160.0 440.0h0M170.0 440.0h0M190.0 440.0h0M65.0 450.0h0M75.0 450.0h0M85.0 450.0h0M95.0 450.0h0M105.0 450.0h0M115.0 450.0h0M125.0 450.0h0M135.0 450.0h0M145.0 450.0h0M155.0 450.0h0M165.0 450.0h0M50.0 460.0h0M60.0 460.0h0M90.0 460.0h0M100.0 460.0h0M110.0 460.0h0M120.0 460.0h0M130.0 460.0h0M140.0 460.0h0M150.0 460.0h0M75.0 470.0h0M85.0 470.0h0M95.0 470.0h0M105.0 470.0h0M115.0 470.0h0M125.0 470.0h0";

const SERVICES = ["Snagging inspection", "Flooring", "Blinds", "Other"];
const field =
  "w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 font-medium focus:outline-none focus:border-[#b7935b] transition-colors";
const labelCls = "text-xs font-bold text-gray-500 uppercase tracking-widest";

// Pop-up request form for locations not on the list. Sends straight to HubSpot, same as the contact page.
function RequestModal({ area, onClose }: { area: string; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [firstName, setFirstName] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc to close, lock page scroll, focus first field
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("input,select,textarea")?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const [first, ...rest] = name.split(/\s+/);
    const location = String(f.get("location") || "").trim();
    const service = String(f.get("service") || "");
    const note = String(f.get("note") || "").trim();
    setFirstName(first);
    setStatus("sending");
    try {
      const ok = await submitEnquiry({
        firstName: first,
        lastName: rest.join(" ") || "-",
        email: String(f.get("email") || ""),
        phone: String(f.get("phone") || ""),
        message: `NEW AREA REQUEST\nLocation: ${location}\nService: ${service}${note ? `\nDetails: ${note}` : ""}`,
      });
      setStatus(ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="req-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-[#f2efe8] text-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-black/5 hover:text-gray-900 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>

        {status === "sent" ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-[#b7935b]/15 border border-[#b7935b] flex items-center justify-center">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h3 id="req-title" className="text-3xl font-serif font-bold mb-3">Thanks{firstName ? `, ${firstName}` : ""}!</h3>
            <p className="text-gray-600 leading-relaxed mb-8">We&apos;ve got your request and will get back to you about your area shortly.</p>
            <button type="button" onClick={onClose} className="rounded-full bg-[#1a1814] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#b7935b] transition-colors">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-7 sm:p-10">
            <span className="text-xs font-bold tracking-widest uppercase text-[#b7935b] block mb-2">Request your area</span>
            <h3 id="req-title" className="text-3xl font-serif font-bold mb-2 pr-10">Do we cover {area}?</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">Tell us what you need and we&apos;ll confirm availability.</p>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="req-service" className={labelCls}>Service needed</label>
                <div className="relative">
                  <select id="req-service" name="service" required defaultValue="" className={`${field} appearance-none pr-8 cursor-pointer`}>
                    <option value="" disabled>Choose a service</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <svg className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="req-location" className={labelCls}>Location</label>
                <input id="req-location" name="location" required defaultValue={area} className={field} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="req-name" className={labelCls}>Full name</label>
                <input id="req-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="req-email" className={labelCls}>Email</label>
                  <input id="req-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="req-phone" className={labelCls}>Phone</label>
                  <input id="req-phone" name="phone" type="tel" autoComplete="tel" placeholder="+353 ..." className={field} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="req-note" className={labelCls}>Anything else? <span className="normal-case tracking-normal font-medium text-gray-400">(optional)</span></label>
                <textarea id="req-note" name="note" rows={2} placeholder="e.g. 3-bed new build, handover in March" className={`${field} resize-none`} />
              </div>
            </div>

            {status === "error" && (
              <p className="mt-6 text-sm text-red-600">Something went wrong. Please try again, or call us on +353 89 965 5102.</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-8 w-full rounded-full bg-[#1a1814] text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#b7935b] transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send request"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function IrelandMap({ active, setActive }: { active: string | null; setActive: (a: string | null) => void }) {
  const goTo = useGoToArea();
  return (
    <svg viewBox="0 0 400 500" className="w-full h-auto" role="img" aria-label="Map of Ireland showing Dublin PropTech service areas: Dublin, Drogheda, Westmeath and Kildare">
      <path d={IRELAND_SHAPE} fill="#24201a" />
      <path d={IRELAND_DOTS} stroke="#b7935b" strokeOpacity="0.28" strokeWidth="3.2" strokeLinecap="round" />

      {SERVICE_AREAS.map((a) => {
        const on = active === a.name;
        const left = a.label === "left";
        return (
          <g
            key={a.name}
            className="cursor-pointer"
            onMouseEnter={() => setActive(a.name)}
            onMouseLeave={() => setActive(null)}
            onClick={() => goTo(a.name)}
          >
            <circle cx={a.x} cy={a.y} r="14" fill="#b7935b" className="aws-pulse" style={{ transformOrigin: `${a.x}px ${a.y}px` }} />
            <circle cx={a.x} cy={a.y} r={on ? 8 : 6} fill="#b7935b" stroke="#1a1814" strokeWidth="2.5" style={{ transition: "r .2s" }} />
            <text
              x={left ? a.x - 14 : a.x + 14}
              y={a.y + 5}
              textAnchor={left ? "end" : "start"}
              className="font-serif"
              fontSize={on ? 17 : 15}
              fontWeight="700"
              fill={on ? "#ffffff" : "#e8dcc6"}
              style={{ transition: "all .2s", paintOrder: "stroke" }}
              stroke="#1a1814"
              strokeWidth="5"
              strokeLinejoin="round"
            >
              {a.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function AreasWeServe() {
  const goTo = useGoToArea();
  const [other, setOther] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [requesting, setRequesting] = useState<string | null>(null);
  const closeRequest = useCallback(() => { setRequesting(null); setOther(""); }, []);

  // "Somewhere else?" → open the request pop-up right here (no page change)
  const requestArea = (e: React.FormEvent) => {
    e.preventDefault();
    const area = other.trim();
    if (!area) return;
    setRequesting(area);
  };

  return (
    <section aria-labelledby="areas-heading" className="relative w-full bg-[#1a1814] text-white py-20 md:py-28 overflow-hidden">
      <style>{`
        @keyframes aws-pulse { 0% { transform: scale(.4); opacity: .55 } 100% { transform: scale(2.2); opacity: 0 } }
        .aws-pulse { animation: aws-pulse 2.4s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) { .aws-pulse { animation: none; opacity: .15 } }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* Left: copy, area list, request */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 lg:order-1 min-w-0"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Where We Work</span>
          <h2 id="areas-heading" className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-5 leading-[1.05]">
            Areas We Serve
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed mb-10">
            Snagging inspections, flooring and blinds across Ireland. Choose your area to book, or ask about yours.
          </p>

          <ul className="border-t border-white/10">
            {SERVICE_AREAS.map((a, i) => {
              const on = active === a.name;
              return (
                <li key={a.name} className="border-b border-white/10">
                  <Link
                    href={hrefFor(a.name)}
                    onClick={(e) => { e.preventDefault(); goTo(a.name); }}
                    onMouseEnter={() => setActive(a.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(a.name)}
                    onBlur={() => setActive(null)}
                    className="group flex items-center gap-5 py-5 transition-colors"
                  >
                    <span className={`font-serif text-sm w-6 transition-colors ${on ? "text-[#b7935b]" : "text-white/30"}`}>0{i + 1}</span>
                    <span className="flex-1">
                      <span className={`block font-serif text-2xl md:text-3xl font-bold transition-colors ${on ? "text-[#b7935b]" : "text-white"}`}>{a.name}</span>
                      <span className="block text-sm text-gray-400 mt-0.5">{a.detail}</span>
                    </span>
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                        on ? "border-[#b7935b] bg-[#b7935b] text-[#1a1814]" : "border-white/20 text-white/70"
                      }`}
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                    <span className="sr-only">Book in {a.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Outside the listed areas → pop-up request form */}
          <form onSubmit={requestArea} className="mt-10">
            <label htmlFor="other-area" className="block font-serif text-lg font-bold mb-1">Somewhere else?</label>
            <p className="text-sm text-gray-400 mb-4">Tell us your town and we&apos;ll confirm if we can cover it.</p>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 pl-5 focus-within:border-[#b7935b] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              <input
                id="other-area"
                type="text"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                placeholder="e.g. Galway, meath, Wexford"
                className="flex-1 min-w-0 bg-transparent py-2.5 text-white placeholder:text-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!other.trim()}
                className="shrink-0 rounded-full bg-[#b7935b] px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-[#1a1814] transition-colors disabled:opacity-40 disabled:hover:bg-[#b7935b] disabled:hover:text-white"
              >
                Request
              </button>
            </div>
          </form>
        </motion.div>

        {/* Right: map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="order-1 lg:order-2 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none mx-auto [background:radial-gradient(closest-side,rgba(183,147,91,0.14),transparent)]"
        >
          <IrelandMap active={active} setActive={setActive} />
        </motion.div>
      </div>

      {/* Portal to <body> so no parent animation/overflow can clip the pop-up */}
      {requesting && createPortal(<RequestModal area={requesting} onClose={closeRequest} />, document.body)}
    </section>
  );
}