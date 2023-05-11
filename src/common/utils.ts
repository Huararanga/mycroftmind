import { GraphQLError } from 'graphql';
import { TodoModel } from '../features/todo/types';

export function serializeGraphQLError(errors: GraphQLError[]) {
    return errors.map((error) => error.message).join(";")
}

export function findTodoById(items: TodoModel[], id: string) {
    return items.find((item) => item.id === id);
}