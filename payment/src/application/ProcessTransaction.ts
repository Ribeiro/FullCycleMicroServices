export default class ProcessTransaction {

    constructor() {

    }

    async execute(input: Input): Promise<Output> {
        return {
            externalCode: input.externalCode,
            success: true
        }

    }

}

type Input = {
    externalCode: string,
    creditCardNumber: string,
    creditCardCvv: string,
    creditCardExpDate: string,
    total: number
}

type Output = {
    externalCode: string,
    success: boolean
}