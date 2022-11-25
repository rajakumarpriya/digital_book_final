package com.digitalbooks.author.publish;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.digitalbooks.author.entitys.BaseResponse;
import com.digitalbooks.author.entitys.BookDetails;

@FeignClient(name = "BOOK-SERVICE", url = "localhost:8765/book")
@CrossOrigin(origins = "*")
public interface BookFeign {

	@PostMapping("/publishbook")
	public BaseResponse publishBook(@RequestBody BookDetails bookDetails);

	@GetMapping("/getallbooksforauthor")
	public List<BookDetails> getAllBooksForAuthor(@RequestParam String emailId);

	@PutMapping("/editorblockbook")
	public BaseResponse editOrBlockBook(@RequestBody BookDetails bookDetails);

	@GetMapping("/getallbooksforauthor")
	public List<BookDetails> getAllBooksForAuthor(@RequestParam int authorProfileId);
}
