
describe("Test ´Create an Account´ form ", () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl + 'index.php?controller=authentication&back=my-account')
    })

    it("Empty Email Field should show an error", () => {
        cy.get('#SubmitCreate').click()
        cy.get('#create_account_error').should('contain', 'Invalid email address.')
    })

    it("Email requires valid email address - no @", () => {
        cy.get('#email_create').type('andrey1gmail.com')
        cy.get('#SubmitCreate').click()
        cy.get('#create_account_error').should('contain', 'Invalid email address.')
    })

    it("Email requires valid email address - no .com", () => {
        cy.get('#email_create').type('andrey1@gmail')
        cy.get('#SubmitCreate').click()
        cy.get('#create_account_error').should('contain', 'Invalid email address.')

    })

    it("Valid Email should be accepted", () => {
        cy.get('#email_create').type(cy.faker.internet.email())
        cy.get('#SubmitCreate').click()
        cy.url().should('include', '#account-creation')
    })
//cia normalus sukurtas vartotojas kuris jau ju sistemoje egzistuoja
it.skip("Submited form should be accepted", () => {
    cy.get('#email_create').type('andrey@gmail.com')
    cy.get('#SubmitCreate').click()
    cy.get('#id_gender1').check()
    cy.get('#customer_firstname').type('Andrey')
    cy.get('#customer_lastname').type('Ivanovich')
    cy.get('#passwd').type('Asdfw80')
    cy.get('#optin').check()
    cy.get('#days').select('6')
    cy.get('#months').select('January')
    cy.get('#years').select('1995')
    cy.get('#address1').type('1919 Airplane Avenue')
    cy.get('#city').type('Stamford')
    cy.get('#id_state').select('Alaska')
    cy.get('#postcode').type('06902')
    cy.get('#phone_mobile').type('860-866-3283')
    cy.get('#alias').type('Airplane Avenue')
    cy.get('#submitAccount').click()
    cy.get('.info-account').should('contain', "Welcome to your account. Here you can manage all of your personal information and orders.")
})

it.only("Submited form should be accepted", () => {
        cy.get('#email_create').type(cy.faker.internet.email())
        cy.get('#SubmitCreate').click()
        cy.get('#id_gender1').check()
        cy.get('#customer_firstname').type(cy.faker.name.firstName())
        cy.get('#customer_lastname').type(cy.faker.name.lastName())
        cy.get('#passwd').type('Asdfw80')
        cy.get('#optin').check()
        
        cy.get('#days').select(cy.faker.datatype.number({min: 1, max: 29}))
        cy.get('#months').select(cy.faker.date.month())
        cy.get('#years').select(""+cy.faker.datatype.number({min: 1960, max: 2002}))

        cy.get('#address1').type(cy.faker.address.zipCodeByState())
        cy.get('#city').type(cy.faker.address.cityName())
        cy.get('#id_state').select('Alaska')
        cy.get('#postcode').type(cy.faker.address.zipCode())
        cy.get('#phone_mobile').type(cy.faker.phone.phoneNumber())
        cy.get('#alias').type('Airplane Avenue')
        cy.get('#submitAccount').click()
        cy.get('.info-account').should('contain', "Welcome to your account. Here you can manage all of your personal information and orders.")
    })

    it("Submited empty form should show errors", () => {
        cy.get('#email_create').type('andrey1@gmail.com')
        cy.get('#SubmitCreate').click()
        cy.get('#submitAccount').click()
        cy.get('.alert-danger').should('contain', 'There are 8 errors')
    })

    it("Password requires more than 5 characters", () => {
        cy.get('#email_create').type('andrey1@gmail.com')
        cy.get('#SubmitCreate').click()
        cy.url().should('include', '#account-creation')
        cy.get('#passwd').type('Adf')
        cy.get('#submitAccount').click()
        
        cy.get('.alert-danger').should('contain', 'passwd is invalid.')
    })

    it("Zip post code should macth format - 5 numbers", () => {
        cy.get('#email_create').type('andrey1@gmail.com')
        cy.get('#SubmitCreate').click()
        cy.get('#postcode').type('069')
        cy.get('#submitAccount').click()

        cy.get('.alert-danger').should('contain', "The Zip/Postal code you've entered is invalid.")
    })

    it("Alias is too long. Maximum length: 32", () => {
        cy.get('#email_create').type('andrey1@gmail.com')
        cy.get('#SubmitCreate').click()        
        cy.get('#alias').type('Airplane Avenue Airplane Avenue Airplane Avenue')
        cy.get('#submitAccount').click()

        cy.get('.alert-danger').should('contain', "alias is too long. Maximum length: 32")
    })

    it("Fields and labels should exist", () => {
        // Arrange
        cy.get('#email_create').type('andrey1@gmail.com')

        // Act
        cy.get('#SubmitCreate').click()

        // Assert
        cy.get('#id_gender1').check()
        cy.get('#customer_firstname').should.exist
        cy.get('#customer_lastname').should.exist
        cy.get('#passwd').should.exist
        cy.get('#optin').should.exist
        cy.get('#days').should.exist
        cy.get('#months').should.exist
        cy.get('#years').should.exist
        cy.get('#address1').should.exist
        cy.get('#city').should.exist
        cy.get('#id_state').should.exist
        cy.get('#postcode').should.exist
        cy.get('#phone_mobile').should.exist
        cy.get('#alias').should.exist
        cy.get('#submitAccount').should.exist
    })
})
