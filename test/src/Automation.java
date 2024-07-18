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

	public Automation signUp(String username, String password, String email) throws InterruptedException{
		WebElement signUpButton = driver.findElement(By.id("sign-up"));
		signUpButton.click();
		Thread.sleep(waitTime);
		List<WebElement> inputFields = driver.findElements(By.tagName("input"));
		inputFields.get(0).clear();
		inputFields.get(0).sendKeys(username);
		inputFields.get(1).clear();
		inputFields.get(1).sendKeys(password);
		inputFields.get(2).clear();
		inputFields.get(2).sendKeys(email);
		WebElement logInForm = driver.findElement(By.tagName("form"));
		logInForm.submit();
		return this;
	}
}
