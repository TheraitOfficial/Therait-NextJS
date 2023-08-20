interface Array {
    attributes: {
        customID: number,
    }
}

export const sortArrays = (array: Array[]) => {
    for(let i = 0; i < array.length; i++) {
        for(let j = i+1; j < array.length; j++) {
            if(array[j].attributes.customID < array[j-1].attributes.customID) {
                let temp:any = array[j]
                array[j] = array[j-1]
                array[j-1] = temp
            }
        }
    }
}

export const sortArraysBy = (array: any[], val: any) => {
    for(let i = 0; i < array.length; i++) {
        for(let j = i+1; j < array.length; j++) {
            if(array[j].attributes.val < array[j-1].attributes.val) {
                let temp:any = array[j]
                array[j] = array[j-1]
                array[j-1] = temp
            }
        }
    }
}