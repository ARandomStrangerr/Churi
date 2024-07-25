import org.openqa.selenium.firefox.FirefoxDriver;

class Main{
	static void testSignUp() throws InterruptedException {
		Automation automation = new Automation(new FirefoxDriver(), "webdriver.firefox.driver", "/home/MO/workplace/firefox-webdriver/geckodriver", 4000);
		automation.openWebsite("http://localhost:5173")
				.signIn("hungcom96","hungcom23")
				.close();
	}
	public static void main (String[] args) throws Exception{
		testSignUp();
	}
}

