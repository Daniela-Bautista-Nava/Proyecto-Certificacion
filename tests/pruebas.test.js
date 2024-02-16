// Importar el SDK de NEAR
const nearAPI = require('near-api-js');

// Importar el contrato inteligente
const VentaPaquetesInternet = require('../contracts/contract');

// Pruebas unitarias para el contrato inteligente
describe('VentaPaquetesInternet', () => {
    let contract;

    beforeEach(() => {
        contract = new VentaPaquetesInternet();
    });

    it('debería agregar un nuevo paquete de internet correctamente', () => {
        const result = contract.addPackage('paquete1', 100);
        expect(result).toBe('Paquete paquete1 agregado con éxito.');
    });

    it('debería lanzar un error al agregar un paquete que ya existe', () => {
        contract.addPackage('paquete2', 200);
        expect(() => {
            contract.addPackage('paquete2', 300);
        }).toThrow('El paquete paquete2 ya existe.');
    });

    it('debería comprar un paquete de internet correctamente', () => {
        contract.addPackage('paquete3', 300);
        const result = contract.buyPackage('paquete3', 'comprador1', 350);
        expect(result).toBe('¡Paquete paquete3 comprado por comprador1!');
    });

    it('debería lanzar un error al comprar un paquete no disponible', () => {
        expect(() => {
            contract.buyPackage('paquete4', 'comprador2', 400);
        }).toThrow('El paquete paquete4 no está disponible.');
    });

    it('debería lanzar un error al comprar un paquete con monto insuficiente', () => {
        contract.addPackage('paquete5', 500);
        expect(() => {
            contract.buyPackage('paquete5', 'comprador3', 450);
        }).toThrow('El monto enviado (450) es menor que el precio del paquete (500).');
    });
});
