describe('Sprocket Factory API', () => {
  const baseUrl = 'http://localhost:8000/api/v1';
  const listUrl = `${baseUrl}/factories`;
  const detailUrl = (id: string | number) => `${listUrl}/${id}`;

  describe('List endpoint', () => {
    it('returns all factories on the list endpoint', () => {
      cy.request({
        method: 'GET',
        url: listUrl,
      }).should((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  describe('Get detail endpoint', () => {
    it('returns a factory identified by a given id', () => {
      cy.request({
        method: 'GET',
        url: listUrl,
      })
        .its('body.factories.0')
        .as('factory')
        .then(function () {
          cy.request({
            method: 'GET',
            url: detailUrl(1),
          }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.include(this.factory);
          });
        });
    });
  });
});
