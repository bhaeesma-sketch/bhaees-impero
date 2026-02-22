from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to Home
        print("Navigating to Home...")
        page.goto("http://localhost:8080")

        # Wait for canvas to be present (Hero3D)
        print("Checking for 3D Canvas...")
        try:
            page.wait_for_selector("canvas", timeout=10000)
            print("Canvas element found.")
        except:
            print("Canvas element NOT found (timeout).")

        # Take screenshot of Home with 3D Hero
        # Wait a bit for the scene to load/render
        page.wait_for_timeout(3000)
        page.screenshot(path="verification_home_3d.png")
        print("Screenshot of Home saved to verification_home_3d.png")

        # Scroll down to see Parallax Images
        print("Scrolling down...")
        page.evaluate("window.scrollBy(0, 1500)")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification_home_scroll.png")
        print("Screenshot of Home Scrolled saved to verification_home_scroll.png")

        # Navigate to Catalog to check Product Cards 3D hover (static check only)
        print("Navigating to Catalog...")
        page.goto("http://localhost:8080/catalog")
        page.wait_for_selector(".perspective-1000", timeout=5000) # Check if class is applied
        print("Found perspective-1000 class on product cards.")

        page.screenshot(path="verification_catalog_3d.png")
        print("Screenshot of Catalog saved to verification_catalog_3d.png")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
