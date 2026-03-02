import * as Keychain from 'react-native-keychain'

class SecureStorage {
    static async setItem(key:any,value:any){
        try {
            console.log(value)
            await Keychain.setGenericPassword(key,value,{
                service:key,
                accessible:Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK
            })
            return true
        } catch (error) {
            console.log('error storing data',error)
            return false
        }
    }

    static async getItem(key:any){
        try {
            const credentials = await Keychain.getGenericPassword({
                service:key
            })

            if(credentials){
                return credentials.password
            }
            return null
        } catch (error) {
            console.log('Error retreiving data',error)
            return null
        }
    }

    static async removeItem(key:any){
        try {
            await Keychain.resetGenericPassword({
                service:key
            })

            return true;
        } catch (error) {
            console.log('Error deleting data',error)
            return false
        }
    }
} 

export default SecureStorage