describe('home page', () => {
	it('bold after clicking switch', () => {
		cy.visit('http://localhost:3000'); 
		cy.get('span[data-test-id="celsius"]').should('have.class', 'font-semibold');
		cy.get('span[data-test-id="fahrenheit"]').should('not.have.class', 'font-semibold');

		cy.get('.react-toggle').click();

		cy.get('span[data-test-id="fahrenheit"]').should('have.class', 'font-semibold');
		cy.get('span[data-test-id="celsius"]').should('not.have.class', 'font-semibold');

	});

	it('select city', () => {
		cy.visit('http://localhost:3000');
		cy.get('#react-select-city-selector-input').type('bogota{enter}');
		cy.get('#react-select-city-selector-option-0').click();
		cy.get('h2[data-test-id="city-name"]', {timeout: 10000}).should('be.visible').and('contain', 'Bogota');
	});
});
