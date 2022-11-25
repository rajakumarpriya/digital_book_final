export class UrlConstants {

    private static AUTHOR: string = "http://localhost:8091/author/";
    private static READER: string = "http://localhost:8092/reader/";
    //Author
    public static LOGIN: string = UrlConstants.AUTHOR + "login?emailId=";
    public static REGISTER: string = UrlConstants.AUTHOR + "register";
    public static GETBOOKSFORAUTHOR: string = UrlConstants.AUTHOR + "getallbooksforauthor?authorProfileId=";
    public static PUBLISHBOOK: string = UrlConstants.AUTHOR + "publishbook";
    public static EDITORBLOCKBOOK: string = UrlConstants.AUTHOR + "editorblockbook";

    //Reader 
    public static GETALLBOOKSFROUSER: string = UrlConstants.READER + "getallbooks";
    public static SEARCHABOOK: string = UrlConstants.READER + "searchbooks";
    public static PURCHASEABOOK: string = UrlConstants.READER + "purchasebook";
    public static GETPURCHASEDBOOKS: string = UrlConstants.READER + "getpurchasedbooks?emailId=";
    public static GETBOOKWITHPAYMENTID: string = UrlConstants.READER + "getpaymentdetails?paymentId=";
    public static UNSUBSCRIBEBOOK: string = UrlConstants.READER + "unsubscribebook";

}