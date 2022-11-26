import jwt, { JwtPayload, VerifyCallback, VerifyErrors } from 'jsonwebtoken';
import { UserData } from '../interfaces/interfaces';

export default class auth{

    /**
     * The signToken function will sign a token for the current user session 
     * Encrypting relevant info.
     * @param data the relevant data to encrtpy for a token
     * @returns jwt signed token
     */
    static signToken(data: object): string{
        return jwt.sign(data, <string>process.env.JWT_SECRET, {expiresIn: '2h'});
    }

    /**
     * The verifyToken function will verify and decode a jwt token sent from 
     * the client.
     * @param data The token to verify.
     * @returns decoded data or a error
     */
    static verifyToken(data: string): UserData{
        try{
            const userData: UserData = <UserData>jwt.verify(data, <string>process.env.JWT_SECRET);
            return userData;
        }catch(err: any){
            throw new Error(err)
        }
    }
}