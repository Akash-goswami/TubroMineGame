import React, { useEffect, useState } from 'react'

export default function Footer() {
      const [currentDateTime, setCurrentDateTime] = useState<string>("");
    
    useEffect(() => {
        const updateDateTime = () => {
          const now = new Date();
    
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(now);
    
          const formattedTime = now.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
    
          setCurrentDateTime(`${formattedDate} | ${formattedTime}`);
        };
    
        updateDateTime();
    
        const intervalId = setInterval(updateDateTime, 1000);
    
        return () => clearInterval(intervalId);
      }, []);
  return (
    <div className="footer-container">
    <div>TurboMines | Version: "1.0.3"</div>
    <div>
      {`${new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
        .format(new Date())
        .replace(
          /(\d{2}) (\w{3}) (\d{4})/,
          "$1 $2, $3"
        )} | ${new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}`}
    </div>
  </div>
  )
}
