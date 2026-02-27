// import { NoteDTO } from '../models/dto';
// import { Note } from '../models/models';

// export class NoteMapper {
//   //   static fromDTO(dto: NoteDTO): Note {
//   //     return {
//   //       id: dto.id,
//   //       title: dto.note_title,
//   //     //   content: dto.raw_content,
//   //     //   category: this.mapCategoryId(dto.cat_id),
//   //     //   createdAt: new Date(dto.created_at),
//   //       //   tags: dto.tags.map((t) => ({ name: t, color: '#3b82f6' })),
//   //     };
//   //   }

//   static toDTO(note: Note): Partial<NoteDTO> {
//     return {
//       note_title: note.title,
//     };
//   }

//   private static mapCategoryId(id: number): string {
//     const categories: Record<number, string> = { 1: 'Frontend', 2: 'Backend' };
//     return categories[id] || 'Personal';
//   }
// }
