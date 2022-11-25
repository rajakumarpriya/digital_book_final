package com.digitalbooks.author;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.digitalbooks.author.publish.AuthorService;


/**
 * @author cogjava3237
 *
 */
@SpringBootTest
class AuthorServiceApplicationTests {

	@Test
	void contextLoads() {
	}

	@InjectMocks
	AuthorService serviceApplication;
	
	@Test
	public void testLittle() {
		
	}
	
	
	
}
