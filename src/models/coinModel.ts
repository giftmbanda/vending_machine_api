import ICoin from '../interfaces/ICoin'; // Coin interface

class Coin {

    private fiftyCentQuantity: number;
    private oneRandQuantity: number;
    private twoRandQuantity: number;
    private fiveRandQuantity: number;
    private totalAmount: number;
    private readonly CoinValue = {
        fiftyCentValue: 0.5,
        oneRandValue: 1,
        twoRandValue: 2,
        fiveRandValue: 5,
    }

    constructor(coinObj?: ICoin) {
        this.fiftyCentQuantity = coinObj && Number(coinObj.fiftyCentQuantity) || 0;
        this.oneRandQuantity = coinObj && Number(coinObj.oneRandQuantity) || 0;
        this.twoRandQuantity = coinObj && Number(coinObj.twoRandQuantity) || 0;
        this.fiveRandQuantity = coinObj && Number(coinObj.fiveRandQuantity) || 0;
        this.totalAmount = 0;
    }

    private calcTotalAmount(): void {
        this.totalAmount = this.fiftyCentQuantity * Number(this.CoinValue.fiftyCentValue);
        this.totalAmount += this.oneRandQuantity * Number(this.CoinValue.oneRandValue);
        this.totalAmount += this.twoRandQuantity * Number(this.CoinValue.twoRandValue);
        this.totalAmount += this.fiveRandQuantity * Number(this.CoinValue.fiveRandValue);
    }

    public getTotalAmount(): number {
        this.calcTotalAmount();
        return this.totalAmount;
    }
}

export default Coin;
