// Importar el SDK de NEAR
const nearAPI = require('near-api-js');

// Definir la clase del contrato inteligente
class VentaPaquetesInternet {
    // Constructor
    constructor() {
        // Inicializar el estado del contrato
        this.packages = new Map();
    }

    // Método para comprar un paquete de internet
    buyPackage(packageId, buyer, amount) {
        if (!this.packages.has(packageId)) {
            throw new Error(`El paquete ${packageId} no está disponible.`);
        }

        const price = this.packages.get(packageId);
        if (amount < price) {
            throw new Error(`El monto enviado (${amount}) es menor que el precio del paquete (${price}).`);
        }

        // Aquí se realizaría la lógica de la compra del paquete
        // Por ejemplo, emitir una transacción a la cuenta del vendedor, actualizar el estado, etc.

        return `¡Paquete ${packageId} comprado por ${buyer}!`;
    }

    // Método para agregar un nuevo paquete de internet
    addPackage(packageId, price) {
        if (this.packages.has(packageId)) {
            throw new Error(`El paquete ${packageId} ya existe.`);
        }

        this.packages.set(packageId, price);
        return `Paquete ${packageId} agregado con éxito.`;
    }
}

// Exportar el contrato inteligente
module.exports = VentaPaquetesInternet;

