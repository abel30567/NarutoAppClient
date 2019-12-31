# Development Log

## November 8, 2019
### Stop2Shop Ordering
Need to figure out the following components
1. Checkout flow
2. Pricing of shipping
3. Cart/Orders functionality
4. Sending actual request
5. Terms and conditions
6. Payments
7. Pricing per Card, mapping the value to each card in database
8. Confirmation of order and counts

#### Checkout flow
This needs to be seamless on the app for great user experience. 
1. The customer sees the card they want is available on stop2shop through the app. 
2. The customer presses the button to add card to cart.
3. The customer receives a notification that item is added to cart. Is given the option to "Checkout Now" or "Keep Searching".
4. If the customer presses to "Keep Searching" they will return to the CardScreen that they chose.
5. If the customer presses "Checkout Now" they will be sent to their Cart page and they can see how much for the card per unit, the requested quantity, and the total cost per that item on all the items in their cart. Please see Cart functionality section for more UI/UX details.
6. Once the customer sees their total for the cards they ordered and press "Checkout" they need to enter the following details due to Stop2Shop forms
- First Name
- Last Name
- Email Address Confirmation
- Street Address 1
- Street Address 2
- City
- State
- Zip Code
- Phone Number
- Country
- Shipping Method is Card Singles Shipping - Under 100 Cards MAX ORDER OF 99 CARDS
7. Next they will need to checkout with Paypal and then submit the order.
8. Stop2Shop sends email confirmation that the order came through. When this happens the customer needs to receive a notification.
9. When Stop2Shop sends the email confirming what cards are shipped the customer needs to receive a notification that leads them to the shipped order that corresponds in email. If there are any differences in quantities and price this needs to be shown on this page and refunded to the customer. The refund can be done manually for now. This page also needs to show the customer's tracking code to be able to track where the order is at a given time.
10. The customer should receive a notification when the package is delivered.
11. Upon delivery customer should give us a rating on the app store

### Pricing of shipping and Tax
Stop2Shop has priced its shipping for Under 100 Cards. The max order of a cart that will be available is 99 cards.
The following are the prices based on customer location and card count.

Location	    1 - 39 Cards	40 - 69 Cards	70 - 99 Cards	
United States	$4.29	        $4.29	        $4.29	
Canada	        $14.99	        $16.99	        $19.99	
International	$18.99	        $21.99	        $24.99	

Tax is based off the actual state the customer is from within the US.

### Cart/Orders functionality
Cart must be displayed at the top right of the screen in the CardScreen, SearchResultsScreen, SearchScreen. Cart is displayed at the top left of the NewsScreen.

When the cart button is pressed from these screens it will lead them to a page with two tabs, similar to COLLECTION | WANT LIST. The two options will be CART | ORDERS. 
Under the CART tab the customer can see their current order and all the items they have added to their cart. If it is empty it will say "Add a card to your shopping cart". The cart page should
1. Update quantity per item desired, batch update
2. Delete item from cart
3. Show the total value of the selected cards without shipping and convinience fee.
4. Not be deleted when the user leaves the app. 
5. Send customer to checkout

#### Data model notes
- Requires a dual model system where there is a Cart Model that is used to generate Order Objects. Orders have the true state of a customer's order. For instance, once the customer checksout their Cart. The Cart needs to become an Order with "Pending Confirmation" status and the Cart needs to be reset to not hold any items. 
##### Order Statuses 
When the customer makes the order and it is sent to Stop2Shop it has a "Pending Confirmation" status. 

When Stop2Shop sends the confirmation email the order status should be changed to "Shipped". If there is a refund that needs to be delivered the customer can see this in their order tab. This refund needs to be handled by us depending on how the payments are processed. 

When the order is delivered we should check through some USPS API that it is delivered and then send a notification to the customer saying their package is delivered.

### Sending actual request 
So you add things to cart with the following POST request
- URL: https://order.store.yahoo.net/my1stop2shop/cgi-bin/wg-order?my1stop2shop
- Method: POST
- Body: 
    - vwcatalog: my1stop2shop
    - vwitem: n617 (This is the card's cardNumber)
    - vwquantity: 1 (The desired quantity)
Notes: Cannot to a batch request, still need to see how the update works from the Stop2Shop cart. The stop2shop cart works with storing cookies for the session and to get identity. This needs to be cleared per request. 

#### Possible flow of request:
1. User generates order through app.
2. Every 5 minutes something looks for the orders of a certain status and does batch requests.
3. Do X amount of POST requests depending on the amount of desired cards. 

The cart uses 3 cookies to create an identity. Once the first request is created it will generate 3 cookies
- ysco_key_session_cookie
- ysco_key_shopping_cart_cookie
- ysco_key_browser_session_cookie
These cookies generate an identity for the cart to use. Per each request that corresponds to an order the three cookies are required.
























