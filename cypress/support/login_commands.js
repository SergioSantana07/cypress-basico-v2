/// <reference types="Cypress" /> 

//Login_Commands

Cypress.Commands.add(`fillMandatoryFieldsAndSubmit`, () => {
    cy.get(`#firstName`).type(`Firstname`)
    cy.get(`#lastName`).type(`Lastname`)
    cy.get(`#email`).type(`email@gmail.com`)
    cy.get(`#open-text-area`).type(`teste`)
    cy.contains(`Enviar`).click()
    cy.get(`.success`).should(`be.visible`).contains(`Mensagem enviada com sucesso.`)
})