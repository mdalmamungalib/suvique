// Set the date we're counting down to (30 days from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 30);
        
        // Update the count down every 1 second
        const x = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the count down date
            const distance = countDownDate - now;
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            document.querySelector(".days").textContent = days.toString().padStart(2, '0');
            document.querySelector(".hours").textContent = hours.toString().padStart(2, '0');
            document.querySelector(".minutes").textContent = minutes.toString().padStart(2, '0');
            document.querySelector(".seconds").textContent = seconds.toString().padStart(2, '0');
            
            // If the count down is finished, clear interval
            if (distance < 0) {
                clearInterval(x);
                document.querySelector(".count").innerHTML = "<h4>Sale Ended!</h4>";
            }
        }, 1000);