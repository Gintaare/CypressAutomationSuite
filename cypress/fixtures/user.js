const f = require('@faker-js/faker');

const user1 = {
  email: f.internet.email(),
  password: f.internet.password(),
  firstName: f.name.firstName(),
  lastName: f.name.lastName(),

  dob: {
    day: cy.faker.datatype.number({ min: 1, max: 29 }),
    month: cy.faker.date.month(),
    year: "" + cy.faker.datatype.number({ min: 1960, max: 2002 }),
  },

  address: {
    street: f.address.streetAddress(),
    city: f.address.city(),
    state: f.address.state(),
    zip: f.address.zipCode("00000"),
  },
  phone: f.phone.phoneNumberFormat(1),
  alias: f.lorem.words(2)
}

module.exports = {
  user1,
}


