package com.digitalbooks.reader.purchase;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.digitalbooks.reader.entitys.BaseResponse;
import com.digitalbooks.reader.entitys.BookDetails;
import com.digitalbooks.reader.exceptionhandler.BooksExceptionHandler;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reader")
public class ReaderController {
	Logger logger = LoggerFactory.getLogger(ReaderController.class);

	@Autowired
	private ReaderService service;

	@GetMapping("/getallbooks")
	public List<BookDetails> getAllBookDetails(@RequestParam(required = false) String title,
			@RequestParam(required = false) String author, @RequestParam(required = false) String publisher,
			@RequestParam(required = false, defaultValue = "0") long fromDate,
			@RequestParam(required = false, defaultValue = "0") long toDate) throws BooksExceptionHandler {
		try {
			return service.getAllBookDetails(title, author, publisher, fromDate, toDate);

		} catch (Exception e) {
			logger.info("Exception occured while fetching book details");
		}
		return null;

	}

	@PutMapping("/purchasebook")
	public BaseResponse purchaseBook(@RequestParam int bookId, @RequestParam String name, @RequestParam String emailId)
			throws BooksExceptionHandler {
		try {
			return service.purchaseBook(bookId, name, emailId);
		} catch (Exception e) {
			logger.info("Exception occured while purchasing book");
		}
		return new BaseResponse();
	}

	@GetMapping("/getpurchasedbooks")
	public List<BookDetails> getPurchasedBooks(@RequestParam String emailId) throws BooksExceptionHandler {
		try {
			return service.getPurchasedBooks(emailId);
		} catch (Exception e) {
			logger.info("Exception occured while fetching purchased books for user");
		}
		return new ArrayList<BookDetails>();
	}

	@GetMapping("/getpaymentdetails")
	public BookDetails getPaymentDetails(@RequestParam String paymentId) throws BooksExceptionHandler {
		try {
			return service.getPaymentDetails(paymentId);
		} catch (Exception e) {
			logger.info("Exception occured while fetching purchased books for user");
		}
		return new BookDetails();
	}

	@DeleteMapping("/unsubscribebook")
	public BaseResponse unSubscriABook(@RequestParam int bookId, @RequestParam String emailId)
			throws BooksExceptionHandler {
		try {
			return service.unSubscriABook(bookId, emailId);
		} catch (Exception e) {
			logger.info("Exception occured while fetching Cancellable books for user");
		}
		return new BaseResponse();
	}

	@PutMapping("/blockbookforuser")
	public BaseResponse blockBookForUser(@RequestParam int bookId) throws BooksExceptionHandler {
		try {
			return service.blockBookForUser(bookId);
		} catch (Exception e) {
			logger.info("Exception occured while fetching Cancellable books for user");
		}
		return new BaseResponse();
	}



}
