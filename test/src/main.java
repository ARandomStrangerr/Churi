import org.openqa.selenium.firefox.FirefoxDriver;

class Main{
	static void testSignUp() throws InterruptedException {
		Automation automation = new Automation(new , "webdriver.firefox.driver", "/home/MO/workplace/firefox-webdriver/geckodriver", 1000);
		automation.openWebsite("http://localhost:5173")
			.signUp("hungcom96","hungcom23", "billslim0996@gmail.com");
	}
	public static void main (String[] args) throws Exception{
		testSignUp();
	}
}

