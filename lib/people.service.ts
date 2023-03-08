import { getDb, DB_NAME } from './service';
import { Query } from 'appwrite';

export type Person = {
    email: string,
    avatar: string,
    jobTitle: string,
    firstName: string,
    lastName: string,
    github: string,
    gitlab: string,
    linkedin: string
}

export function addPeople(data: Record<string, unknown>): Promise<void> {
    return getDb().createDocument(DB_NAME, '640475a2a7b08deb0966', 'doc_id', data)
        .then(res => console.log(res))
        .catch(err => console.error(err));
}

export function getPeople(slug: string): Promise<Person> {
    return getDb().listDocuments(DB_NAME, '640475a2a7b08deb0966', [
        Query.equal('slug', slug),
    ]).then(res => {
        if (res.total < 1) return { email: '', firstName: '', lastName: '' } as Person;
        return {
            email: res.documents[0].email,
            firstName: res.documents[0].first_name,
            lastName: res.documents[0].last_name,
            jobTitle: res.documents[0].job_title,
            avatar: res.documents[0].avatar,
            github: res.documents[0].github,
            gitlab: res.documents[0].gitlab,
            linkedin: res.documents[0].linkedin,
        } satisfies Person;
    })
    .catch(err => {
        console.error(err);
        return { email: '', firstName: '', lastName: ''} as Person
    });
}
