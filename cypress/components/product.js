export class Product {

    static goToCartButton() {
        return cy.get('#shopping_cart_container')
    }

    static items() {
        return cy.get('.inventory_item')
    }

    static queries = {
        addToCart: '[data-test^="add-to-cart"]',
        remove: '[data-test^="remove"]',
        price: '.inventory_item_price'
    }
}
