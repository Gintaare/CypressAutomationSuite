
const { user1 } = require('../fixtures/user')

describe("Test ´Create an Account´ form ", () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl + 'index.php?controller=authentication&back=my-account')
    })

    it("Empty Email Field should show an error", () => {
        cy.get('#SubmitCreate').click()

        // Assert
        cy.get('#create_account_error').should('contain', 'Invalid email address.')
    })

    it("Email requires valid email address - no @", () => {
        cy.get('#email_create').type('andrey1gmail.com')
        cy.get('#SubmitCreate').click()
        // Sometimes it's sloow...
        cy.wait(2000)

        // Assert
        cy.get('#create_account_error').should('contain', 'Invalid email address.')
    })

    it("Email requires valid email address - no TLD", () => {
        cy.get('#email_create').type('andrey1@gmail')
        cy.get('#SubmitCreate').click()

        // Assert
        cy.get('#create_account_error').should('contain', 'Invalid email address.')
    })

    it("Valid Email should be accepted", () => {
        cy.get('#email_create').type(cy.faker.internet.email())
        cy.get('#SubmitCreate').click()

        // Assert
        cy.url().should('include', '#account-creation')
    })


    it("Submited empty form should show errors", () => {
        cy.get('#email_create').type(cy.faker.internet.email())
        cy.get('#SubmitCreate').click()
        cy.get('#submitAccount').click()

        // Assert
        cy.get('.alert-danger').should('contain', 'There are 8 errors')
    })

    it("Password requires more than 5 characters", () => {
        cy.get('#email_create').type(cy.faker.internet.email())
        cy.get('#SubmitCreate').click()
        cy.url().should('include', '#account-creation')
        cy.get('#passwd').type('Adf')
        cy.get('#submitAccount').click()

        // Assert
        cy.get('.alert-danger').should('contain', 'passwd is invalid.')
    })

    it("Zip post code should macth format - 5 numbers", () => {
        cy.get('#email_create').type(cy.faker.internet.email())
        cy.get('#SubmitCreate').click()
        cy.get('#postcode').type('069')
        cy.get('#submitAccount').click()

        // Assert
        cy.get('.alert-danger').should('contain', "The Zip/Postal code you've entered is invalid.")
    })

    it("Alias is too long. Maximum length: 32", () => {
        cy.get('#email_create').type(cy.faker.internet.email())
        cy.get('#SubmitCreate').click()
        cy.get('#alias').type('Airplane Avenue Airplane Avenue Airplane Avenue')
        cy.get('#submitAccount').click()

        // Assert
        cy.get('.alert-danger').should('contain', "alias is too long. Maximum length: 32")
    })

    it("Fields and labels should exist", () => {
        cy.get('#email_create').type(cy.faker.internet.email())
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

    it("Should succeed in creating user", () => {
        cy.get('#email_create').type(user1.email)
        cy.get('#SubmitCreate').click()

        cy.get('#id_gender1').check()
        cy.get('#customer_firstname').type(user1.firstName)
        cy.get('#customer_lastname').type(user1.lastName)
        cy.get('#passwd').type(user1.password)
        cy.get('#optin').check()
        cy.get('#days').select(user1.dob.day)
        cy.get('#months').select(user1.dob.month)
        cy.get('#years').select(user1.dob.year)

        cy.get('#address1').type(user1.address.street)
        cy.get('#city').type(user1.address.city)
        cy.get('#id_state').select(user1.address.state)
        cy.get('#postcode').type(user1.address.zip)
        cy.get('#phone_mobile').type(user1.phone)
        cy.get('#alias').type(user1.alias)
        cy.get('#submitAccount').click()

        // Assert
        cy.get('.info-account').should('contain', "Welcome to your account. Here you can manage all of your personal information and orders.")
    })

    it("Should be able to sign in with recently created user", () => {
        cy.get(".login").click()
        cy.get("#email").type(user1.email)
        cy.get("#passwd").type(user1.password)
        cy.get("#SubmitLogin").click()

        // Assert
        cy.get(".account").invoke('text').should('eq', user1.firstName + " " + user1.lastName)
        cy.get('.info-account').should('contain', "Welcome to your account. Here you can manage all of your personal information and orders.")
    })
})
