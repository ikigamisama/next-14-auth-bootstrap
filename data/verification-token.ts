import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationTOken = await db.verificationToken.findUnique({
			where: { token },
		});

		return verificationTOken;
	} catch {
		return null;
	}
};

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationTOken = await db.verificationToken.findFirst({
			where: { email },
		});

		return verificationTOken;
	} catch {
		return null;
	}
};
