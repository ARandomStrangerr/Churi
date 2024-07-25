import java.util.List;

import org.openqa.selenium.*;

public class Automation {
	private final WebDriver driver;
	private final int waitTime;

	public Automation(WebDriver driver, String driverName, String driverLocation, int waitTime){
		System.setProperty(driverName, driverLocation);
		this.driver = driver;
		this.waitTime = waitTime;
	}
	
	public Automation openWebsite(String url){
		driver.get(url);
		return this;
	}

	public Automation signIn(String username, String password) throws InterruptedException{
		WebElement signInButton = driver.findElement(By.cssSelector("[data-test='sign-in-button']"));
		signInButton.click();
		Thread.sleep(waitTime);
		WebElement usernameInput = driver.findElement(By.cssSelector("[data-test='username-input']")),
				passwordInput = driver.findElement(By.cssSelector("[data-test='password-input']")),
				form = driver.findElement(By.tagName("form"));
		usernameInput.sendKeys(username);
		passwordInput.sendKeys(password);
		form.submit();
		return this;
	}
}
