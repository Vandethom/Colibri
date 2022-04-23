import { Response, NextFunction} from 'express'


export default (role: string, res: Response, next: NextFunction) => {
	switch (role) {
	case 'admin':
		res.status(200).json('My Liege !')
		break
				
	case 'peon':
		res.status(403).json('Don\'t event think of it')
		break
			
	default:
		res.status(500).json('You should authenticate before assuming any permission.')
	}
	
	next()
}


// class UserRole {
// 	role: string

// 	constructor(role: string) {
// 		this.role = role
// 	}

// 	isAuthorized(res: Response, next: NextFunction) {
// 		switch (this.role) {
// 		case 'admin':
// 			res.status(200).json('My Liege !')
// 			break
				
// 		case 'peon':
// 			res.status(403).json('Don\'t event think of it')
// 			break
			
// 		default:
// 			res.status(403).json('You should authenticate before assuming any permission.')
// 		}
// 		next()
// 	}
// }
