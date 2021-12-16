import {
    StatementContainer,
} from './styles';
import { StatementItem } from '../../../components/StatementItem';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { transactions } from '../../../services/resources/pix';

interface statementItem {
		value: number,
		user: {
			firstname: string,
			lastname: string,
		},
        type: 'paid' | 'received',
    	updateAt: Date,
	}

export const Statement = () => {
    useAuth();
    const [statements, setStatements] = useState<statementItem[]>([]);

    const getAllTransactions = async () => {
        const {data} = await transactions();
        setStatements(data.transaction);

    }

    useEffect(() => {
        getAllTransactions();
    }, [])

    return (
        <StatementContainer>           
            {statements?.length > 0 && statements.map(statement => <StatementItem {...statement} />)}
        </StatementContainer>
    )
}