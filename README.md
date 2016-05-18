# daily-quote-greeter
Uses a Quote of the Day API (http://quotes.rest) to make a new terminal login prompt as the day's quote and refresh the Gnome3 desktop background

The basic program is a NodeJS script to get the necessary JSON data from quotes.rest's API, then:
- Take the quote title, content, and author and make a greeter message, which is saved as a .txt file
- Dispatch a shell command to download the quote's corresponding background image (wget) and change gnome3's background using gsettings

I scheduled the script as a cron job to run daily and added a 'cat qotd.txt' line to .zshrc

