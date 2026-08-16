import Link from 'next/link';

type AuthFooterLinkProps = {
	question: string;
	href: string;
	linkText: string;
};

export default function AuthFooterLink({ question, href, linkText }: AuthFooterLinkProps) {
	return (
		<p className="text-sm mt-2">
			{question}{' '}
			<Link href={href} className="link link-primary">
				{linkText}
			</Link>
		</p>
	);
}
