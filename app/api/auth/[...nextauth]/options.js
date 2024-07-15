import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
    providers: [
        GitHubProvider({
            profile(profile) {
                console.log("GitHub profile", profile);
                let userRole = "GitHub User";
                console.log("profile.login", profile.login);
                if (profile.login === "Mert-coderoid") {
                    userRole = "admin"; 
                }
                
                return {
                    ...profile,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: userRole
                };
            },
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        GoogleProvider({
            profile(profile) {
                console.log("Google profile", profile);
                let userRole = "Google User";
                return {
                    ...profile,
                    id : profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: userRole
                };
            },
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },

        async session ({session, token}) {
            if (session?.user) session.user.role = token.role;
            return session;
        }
    }
};