from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to Home
        print("Navigating to Home...")
        page.goto("http://localhost:8080")
        page.wait_for_load_state("networkidle")

        # Check for Gold Rate Ticker
        print("Checking for Gold Rate Ticker...")
        ticker = page.locator("text=Live Rates")
        if ticker.count() > 0:
            print("Gold Rate Ticker found.")
        else:
            print("Gold Rate Ticker NOT found.")

        # Take screenshot of Home
        page.screenshot(path="verification_home.png")
        print("Screenshot of Home saved to verification_home.png")

        # Navigate to Catalog to see Product Cards
        print("Navigating to Catalog...")
        page.goto("http://localhost:8080/catalog")
        page.wait_for_load_state("networkidle")

        # Check for Wishlist Button (Heart icon)
        # It's a button with Heart icon.
        # I can search for a button inside a product card.
        # Product cards have class group relative ...
        # I'll just check if there is a button with a heart icon.
        # Or just take a screenshot.
        page.screenshot(path="verification_catalog.png")
        print("Screenshot of Catalog saved to verification_catalog.png")

        # Navigate to Wishlist Page
        print("Navigating to Wishlist...")
        page.goto("http://localhost:8080/wishlist")
        page.wait_for_load_state("networkidle")

        # Should show "Please log in"
        if page.locator("text=Please log in").count() > 0:
            print("Wishlist page shows 'Please log in' correctly.")
        else:
             print("Wishlist page content unexpected.")

        page.screenshot(path="verification_wishlist.png")
        print("Screenshot of Wishlist saved to verification_wishlist.png")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
