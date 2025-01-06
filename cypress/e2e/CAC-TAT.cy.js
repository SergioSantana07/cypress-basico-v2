/// <reference types="Cypress" /> 

const longtext = `QA (Quality Assurance) é um conjunto de práticas e processos para garantir que produtos ou serviços atendam aos padrões de qualidade. No desenvolvimento de software, envolve testes para identificar falhas e garantir que o produto seja confiável e funcional, colaborando com desenvolvedores para melhorar continuamente a qualidade antes do lançamento.`

/// PARA UTILIZAR SOMENTE O CYPRESS NA HORA DE INDICAR ALGO
describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit(`../../src/index.html`)
    })

    it(`check the application title`, () => {
        cy.title().should(`eq`, `Central de Atendimento ao Cliente TAT`)
    })

    it('Fill in the mandatory fields and submit the form', () => {
        cy.get(`#firstName`).type(`Firstname`)
        
        cy.get(`#lastName`).type(`Lastname`)
        
        cy.get(`#email`).type(`email@gmail.com`)

        cy.get(`#open-text-area`).type(longtext, {delay: 0})

        cy.contains(`Enviar`).click()

        cy.get(`.success`)
        .should(`be.visible`)
        .contains(`Mensagem enviada com sucesso.`)
    })

it(`displays an error message when submitting the form with an email with invalid formatting`, () => {
    cy.get(`#firstName`).type(`Firstname`)
        
        cy.get(`#lastName`).type(`Lastname`)
        
        cy.get(`#email`).type(`email.gmail.com`)

        cy.get(`#open-text-area`).type(longtext, {delay: 0})

        cy.contains(`Enviar`).click()

        cy.get(`.error`)
        .should(`be.visible`)
        .contains(`Valide os campos obrigatórios!`)
})

it(`displays an error message when the telephone number becomes mandatory but is not filled in before submitting the form`, () => {
    cy.get(`#phone`)
    .type(`teste`)
    .should(`have.value`, ``)
})

it(`displays an error message when the telephone number becomes mandatory but is not filled in before submitting the form`, () => {
    cy.get(`#firstName`).type(`Firstname`)
        
    cy.get(`#lastName`).type(`Lastname`)
    
    cy.get(`#email`).type(`email@gmail.com`)

    cy.get(`#open-text-area`).type(longtext, {delay: 0})

    cy.get(`#phone-checkbox`).check()

    cy.get('.phone-label-span').contains(`(obrigatório)`)

    cy.contains(`Enviar`).click()

    cy.get(`.error`)
        .should(`be.visible`)
        .contains(`Valide os campos obrigatórios!`)
})

it(`Fill in and clear the name, surname, email and telephone fields`, () => {
    cy.get(`#firstName`).type(`Firstname`)
        .should(`have.value`, `Firstname`)
        .clear()
        .should(`have.value`, ``)

    cy.get(`#lastName`).type(`Lastname`)
        .should(`have.value`, `Lastname`)
        .clear()
        .should(`have.value`, ``)
    
    cy.get(`#email`).type(`email@gmail.com`)
        .should(`have.value`, `email@gmail.com`)
        .clear()
        .should(`have.value`, ``)

    cy.get(`#phone`).type(`61991999887`)
        .should(`have.value`, `61991999887`)
        .clear()
        .should(`have.value`, ``)
})

it(`displays an error message when submitting the form without filling in the required fields`, () => {
    cy.contains(`Enviar`).click()

    cy.get(`.error`)
        .should(`be.visible`)
        .contains(`Valide os campos obrigatórios!`)
})

it(`successfully submits the form using a custom command`, () => {
    cy.fillMandatoryFieldsAndSubmit()
})

it(`select a product (YouTube) by its text`, () => {
    cy.get(`#product`).select(`YouTube`).should(`have.value`, `youtube`)
})

it(`select a product (Mentoria) based on its value`, () => {
    cy.get(`#product`).select(`mentoria`).should(`have.value`, `mentoria`)
})

it(`select a product (Mentoria) based on its value`, () => {
    cy.get(`#product`).select(1).should(`have.value`, `blog`)
})

it(`mark the type of service "Feedback"`, () =>{
    cy.get(`[value="feedback"]`).check()
        .should(`have.value`, `feedback`)
})

it(`mark the type of service "Feedback"`, () =>{
    cy.get(`[name="atendimento-tat"]`)
        .should(`have.length`, 3)
        .each(function($radio){
            cy.wrap($radio).check().should(`be.checked`)
        })
})

it(`check both checkboxes, then uncheck the last one`, () => {
    //versão resumida
    cy.get(`[type="checkbox"]`).check().should(`be.checked`)
    .last().uncheck().should(`not.be.checked`)
        // usando o each e wrap
        // .should(`have.length`, 2)
        // .each(function($checkbox){
        //     cy.wrap($checkbox).check().should(`be.checked`)
        // })
        // .last().uncheck().should(`not.be.checked`)
})

it(`seleciona um arquivo da pasta fixtures`, () => {
    cy.get(`#file-upload`).selectFile(`cypress/fixtures/example.json`)
        .should(function($input){
            //console.log($input)
            expect($input[0].files[0].name).eq(`example.json`)
        })
})

it(`seleciona um arquivo simulando um drag-and-drop`, () => {
    cy.get(`#file-upload`).selectFile(`cypress/fixtures/example.json`, { action: `drag-drop` })
        .should(function($input){
            expect($input[0].files[0].name).eq(`example.json`)
        })
})

it(`seleciona um arquivo utilizando uma fixture para a qual foi dada um alias`, () => {
    cy.fixture("example.json").as(`examplefile`)
    cy.get(`#file-upload`).selectFile(`@examplefile`)
        .should(function($input){
            expect($input[0].files[0].name).eq(`example.json`)
        })
    
})

it(`verifica que a política de privacidade abre em outra aba sem a necessidade de um clique`, () => {
    cy.get(`[href="privacy.html"]`).should(`have.attr`, `target`, `_blank`)
})

it(`acessa a página da política de privacidade removendo o target e então clicando no link`, () => {
    cy.get(`[href="privacy.html"]`).invoke(`removeAttr`, `target`).click()
})

it(`testa a página da política de privacidade de forma independente`, () => {
    cy.get(`[href="privacy.html"]`).invoke(`removeAttr`, `target`).click()
    cy.title().should(`eq`, `Central de Atendimento ao Cliente TAT - Política de privacidade`) 
})

})
