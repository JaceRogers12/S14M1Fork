-- Database Queries

-- Find all customers with postal code 1010
SELECT * FROM Customers where postalcode = "1010";
-- Find the phone number for the supplier with the id 11
SELECT phone FROM Suppliers where supplierid = 11;
-- List first 10 orders placed, sorted descending by the order date
SELECT * FROM orders order by orderdate desc limit 10; -- This doesn't work by the way. It won't accept limit for some reason, saying there's an issue with order by when I put it in.
-- Find all customers that live in London, Madrid, or Brazil
SELECT * FROM customers where city = "london" or city = "madrid" or country = "brazil";
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
insert into customers (customername, contactname, address, city, postalcode, country) values ("The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "Bag End", "111", "Middle Earth"); -- This also doesn't work. It said I need to use a browser like google chrome to alter the database, but I was using google chrome.
-- Update Bilbo Baggins record so that the postal code changes to "11122"
update customers set postalcode = "11122" where contactName = "Bilbo Baggins"; -- This doesn't work, but neither did INSERT. I got the same error message, but Bilbo wasn't in the database anyway.
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
