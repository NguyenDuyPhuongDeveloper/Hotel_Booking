export class Validate
{
    static email ( mail: string )
    {
        if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( mail ) )
        {
            return true;
        }
        return false;
    }

    static password ( val: string )
    {
        // Password must be at least 8 characters long
        if ( val.length < 8 )
        {
            return false;
        }

        // Password must contain at least one uppercase letter
        if ( !/[A-Z]/.test( val ) )
        {
            return false;
        }

        // Password must contain at least one lowercase letter
        if ( !/[a-z]/.test( val ) )
        {
            return false;
        }

        // Password must contain at least one digit
        if ( !/\d/.test( val ) )
        {
            return false;
        }

        // Password must contain at least one special character
        if ( !/[!@#$%^&*(),.?":{}|<>]/.test( val ) )
        {
            return false;
        }

        return true;
    }
}