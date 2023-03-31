import { hash, compare } from "bcryptjs";

export const hashPassword = async (password: string) => {
	const rounds = 6;
	const hashedPassword = await hash(password, rounds);
	return hashedPassword;
};

export const comparePassword = async (password: string, hash: string) => {
	const isEqual = await compare(password, hash);
	return isEqual;
};
