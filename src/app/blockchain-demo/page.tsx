'use client';

import { useState, useEffect } from 'react';
import { Blockchain } from '../blockchain';
import { Block } from '../blockchain/block';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
    Grid,
    Chip,
    Alert,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Avatar,
    LinearProgress,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Add as AddIcon,
    Build as MiningIcon,
    Security as SecurityIcon,
    AccountBalance as AccountBalanceIcon,
    Receipt as ReceiptIcon,
    Timeline as TimelineIcon,
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon,
    Info as InfoIcon,
} from '@mui/icons-material';

interface Transaction {
    fromAddress: string | null;
    toAddress: string;
    amount: number;
}

export default function BlockchainDemo() {
    const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        fromAddress: '',
        toAddress: '',
        amount: 0,
    });
    const [chainValid, setChainValid] = useState<boolean | null>(null);

    useEffect(() => {
        const initBlockchain = async () => {
            const bc = new Blockchain();
            await bc.initBlockchain();
            setBlockchain(bc);
            setBlocks([...bc.chain]);
        };
        initBlockchain();
    }, []);

    const addTransaction = () => {
        if (
            !blockchain ||
            !newTransaction.toAddress ||
            newTransaction.amount <= 0
        )
            return;

        blockchain.createTransaction({
            fromAddress: newTransaction.fromAddress || null,
            toAddress: newTransaction.toAddress,
            amount: newTransaction.amount,
        });
        setNewTransaction({ fromAddress: '', toAddress: '', amount: 0 });
    };

    const mineBlock = async () => {
        if (!blockchain) return;

        setIsLoading(true);
        try {
            await blockchain.mineData('miner@example.com');
            setBlocks([...blockchain.chain]);
        } catch (error) {
            console.error('Erreur lors du minage:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const validateChain = async () => {
        if (!blockchain) return;

        setIsLoading(true);
        try {
            const isValid = await blockchain.isChainValid();
            setChainValid(isValid);
        } catch (error) {
            console.error('Erreur lors de la validation:', error);
            setChainValid(false);
        } finally {
            setIsLoading(false);
        }
    };

    const corruptBlockchain = async () => {
        if (!blockchain) {
            alert('❌ Impossible de corrompre : blockchain non initialisée');
            return;
        }

        // Vérifier d'abord si la chaîne est valide
        try {
            const isValid = await blockchain.isChainValid();

            if (isValid) {
                alert(
                    '🚫 CORRUPTION BLOQUÉE !\n\n' +
                        'La blockchain est actuellement valide.\n\n' +
                        "• Vérification d'intégrité : ✅ PASSÉE\n" +
                        '• Tous les blocs sont cohérents\n' +
                        '• Impossible de corrompre une chaîne valide\n\n' +
                        "💡 Pour corrompre, il faut d'abord casser la chaîne autrement."
                );
                return;
            }
        } catch (error) {
            console.error('Erreur lors de la vérification:', error);
            alert('❌ Erreur lors de la vérification de la chaîne');
            return;
        }

        // Si la chaîne n'est pas valide, on peut la corrompre
        if (blockchain.chain.length < 2) {
            alert(
                '❌ Impossible de corrompre : pas assez de blocs dans la chaîne'
            );
            return;
        }

        // Corrompre le premier bloc (après Genesis) en modifiant ses données
        const blockToCorrupt = blockchain?.chain[1]; // Premier bloc après Genesis
        if (blockToCorrupt) {
            // Modifier les données du bloc pour casser le hash
            if (blockToCorrupt.data.length > 0) {
                // Modifier le montant de la première transaction
                blockToCorrupt.data[0].amount = 999999; // Montant impossible
            } else {
                // Si pas de transactions, ajouter une transaction corrompue
                blockToCorrupt.data.push({
                    fromAddress: 'HACKER',
                    toAddress: 'CORRUPTED',
                    amount: 999999,
                });
            }

            // Forcer le recalcul du hash (qui sera maintenant invalide)
            blockToCorrupt.calculateHash().then(newHash => {
                blockToCorrupt.hash = newHash;
            });

            alert(
                '🚨 BLOC CORROMPU !\n\nLa blockchain a été corrompue !\n\n' +
                    '• Bloc #' +
                    blockToCorrupt.index +
                    ' modifié\n' +
                    '• Hash recalculé et invalide\n' +
                    '• La validation échouera maintenant\n' +
                    '• Impossible de créer de nouveaux blocs valides\n\n' +
                    '⚠️ SYSTÈME DE PROTECTION ACTIVÉ'
            );

            // Mettre à jour l'affichage
            setBlocks([...(blockchain?.chain || [])]);
        }
    };

    const formatTimestamp = (timestamp: number) => {
        return new Date(timestamp).toLocaleString('fr-FR');
    };

    const formatHash = (hash: string | null) => {
        if (!hash) return 'Non calculé';
        return hash.length > 20 ? `${hash.substring(0, 20)}...` : hash;
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: 'primary.main',
                            mb: 2,
                            mx: 'auto',
                        }}
                    >
                        <AccountBalanceIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        fontWeight="bold"
                    >
                        ⛓️ Blockchain Demo
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Démonstration interactive d&apos;une blockchain avec
                        minage et validation
                    </Typography>

                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        <Card elevation={2} sx={{ bgcolor: 'surface.main' }}>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    <InfoIcon color="info" sx={{ mr: 1 }} />
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        fontWeight="bold"
                                    >
                                        Informations Blockchain
                                    </Typography>
                                </Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={3}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Difficulté de minage
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            color="primary.main"
                                            fontWeight="bold"
                                        >
                                            {blockchain?.difficulty || 3}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Récompense de minage
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            color="success.main"
                                            fontWeight="bold"
                                        >
                                            {blockchain?.miningReward || 0.0001}{' '}
                                            coins
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Transactions en attente
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            color="warning.main"
                                            fontWeight="bold"
                                        >
                                            {blockchain?.data?.length || 0}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Statut de la chaîne
                                        </Typography>
                                        <Chip
                                            label={
                                                chainValid === null
                                                    ? 'Non vérifié'
                                                    : chainValid
                                                      ? 'Valide'
                                                      : 'Invalide'
                                            }
                                            color={
                                                chainValid === null
                                                    ? 'default'
                                                    : chainValid
                                                      ? 'success'
                                                      : 'error'
                                            }
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Box>

                {/* Controls */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {/* Transaction Form */}
                    <Grid item xs={12} lg={6}>
                        <Card elevation={3} sx={{ height: '100%' }}>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 3,
                                    }}
                                >
                                    <Avatar
                                        sx={{ bgcolor: 'primary.main', mr: 2 }}
                                    >
                                        <ReceiptIcon />
                                    </Avatar>
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        fontWeight="bold"
                                    >
                                        Nouvelle Transaction
                                    </Typography>
                                </Box>

                                <Stack spacing={3}>
                                    <TextField
                                        label="Adresse expéditeur"
                                        value={newTransaction.fromAddress || ''}
                                        onChange={e =>
                                            setNewTransaction(prev => ({
                                                ...prev,
                                                fromAddress: e.target.value,
                                            }))
                                        }
                                        placeholder="alice@example.com"
                                        fullWidth
                                        variant="outlined"
                                        helperText="Optionnel (récompense de minage si vide)"
                                    />
                                    <TextField
                                        label="Adresse destinataire"
                                        value={newTransaction.toAddress}
                                        onChange={e =>
                                            setNewTransaction(prev => ({
                                                ...prev,
                                                toAddress: e.target.value,
                                            }))
                                        }
                                        placeholder="bob@example.com"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                    <TextField
                                        label="Montant (coins)"
                                        type="number"
                                        value={newTransaction.amount}
                                        onChange={e =>
                                            setNewTransaction(prev => ({
                                                ...prev,
                                                amount:
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0,
                                            }))
                                        }
                                        placeholder="100.00"
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ min: 0, step: 0.01 }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={addTransaction}
                                        disabled={
                                            !newTransaction.toAddress ||
                                            newTransaction.amount <= 0
                                        }
                                        startIcon={<AddIcon />}
                                        fullWidth
                                        size="large"
                                        sx={{ py: 1.5 }}
                                    >
                                        Ajouter la transaction
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Mining Controls */}
                    <Grid item xs={12} lg={6}>
                        <Card elevation={3} sx={{ height: '100%' }}>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 3,
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: 'secondary.main',
                                            mr: 2,
                                        }}
                                    >
                                        <MiningIcon />
                                    </Avatar>
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        fontWeight="bold"
                                    >
                                        Minage
                                    </Typography>
                                </Box>

                                <Stack spacing={3}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={mineBlock}
                                        disabled={isLoading || !blockchain}
                                        startIcon={
                                            isLoading ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                <MiningIcon />
                                            )
                                        }
                                        fullWidth
                                        size="large"
                                        sx={{ py: 1.5 }}
                                    >
                                        {isLoading
                                            ? 'Minage en cours...'
                                            : 'Miner un bloc'}
                                    </Button>

                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button
                                            variant="outlined"
                                            color="info"
                                            onClick={validateChain}
                                            disabled={isLoading || !blockchain}
                                            startIcon={<SecurityIcon />}
                                            fullWidth
                                            size="large"
                                        >
                                            Valider
                                        </Button>
                                        <Tooltip title="Test de validation dans la console">
                                            <IconButton
                                                color="warning"
                                                onClick={validateChain}
                                                disabled={
                                                    isLoading || !blockchain
                                                }
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={corruptBlockchain}
                                        disabled={
                                            !blockchain ||
                                            blockchain.chain.length < 2
                                        }
                                        startIcon={<ErrorIcon />}
                                        fullWidth
                                        size="large"
                                        sx={{ py: 1.5 }}
                                    >
                                        🚨 Corrompre la Blockchain
                                    </Button>

                                    {chainValid !== null && (
                                        <Alert
                                            severity={
                                                chainValid ? 'success' : 'error'
                                            }
                                            icon={
                                                chainValid ? (
                                                    <CheckCircleIcon />
                                                ) : (
                                                    <ErrorIcon />
                                                )
                                            }
                                            sx={{ mt: 2 }}
                                        >
                                            {chainValid
                                                ? '✅ Chaîne valide'
                                                : '❌ Chaîne invalide'}
                                        </Alert>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Blockchain Visualization */}
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <TimelineIcon
                            color="primary"
                            sx={{ mr: 2, fontSize: 32 }}
                        />
                        <Typography
                            variant="h3"
                            component="h2"
                            fontWeight="bold"
                        >
                            Chaîne de Blocs
                        </Typography>
                        <Chip
                            label={`${blocks.length} blocs`}
                            color="primary"
                            sx={{ ml: 2 }}
                        />
                    </Box>

                    {/* Chain Connection Line */}
                    <Box sx={{ position: 'relative', mb: 4 }}>
                        <LinearProgress
                            variant="determinate"
                            value={
                                (blocks.length / Math.max(blocks.length, 1)) *
                                100
                            }
                            sx={{ height: 4, borderRadius: 2 }}
                        />
                    </Box>

                    <Grid container spacing={3}>
                        {blocks.map((block, index) => (
                            <Grid item xs={12} md={6} lg={4} key={block.index}>
                                <Card
                                    elevation={4}
                                    sx={{
                                        height: '100%',
                                        borderLeft: 6,
                                        borderColor:
                                            index === 0
                                                ? 'success.main'
                                                : 'primary.main',
                                        position: 'relative',
                                        overflow: 'visible',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            transition:
                                                'transform 0.2s ease-in-out',
                                        },
                                    }}
                                >
                                    {/* Block Number Badge */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -12,
                                            left: 20,
                                            bgcolor:
                                                index === 0
                                                    ? 'success.main'
                                                    : 'primary.main',
                                            color: 'white',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 2,
                                            fontSize: '0.875rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        #{block.index}
                                    </Box>

                                    <CardContent sx={{ pt: 4 }}>
                                        <Box sx={{ mb: 3 }}>
                                            <Chip
                                                label={
                                                    index === 0
                                                        ? 'Genesis'
                                                        : `Bloc ${index}`
                                                }
                                                color={
                                                    index === 0
                                                        ? 'success'
                                                        : 'primary'
                                                }
                                                variant="outlined"
                                                size="small"
                                            />
                                        </Box>

                                        <Stack spacing={2}>
                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    display="block"
                                                    gutterBottom
                                                >
                                                    ⏰ Timestamp
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="medium"
                                                >
                                                    {formatTimestamp(
                                                        block.timestamp
                                                    )}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    display="block"
                                                    gutterBottom
                                                >
                                                    🔗 Hash précédent
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        wordBreak: 'break-all',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {formatHash(
                                                        block.previousHash
                                                    )}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    display="block"
                                                    gutterBottom
                                                >
                                                    🔐 Hash actuel
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        wordBreak: 'break-all',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {formatHash(block.hash)}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    display="block"
                                                    gutterBottom
                                                >
                                                    🎯 Nonce
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    color="primary.main"
                                                >
                                                    {block.nonce}
                                                </Typography>
                                            </Box>

                                            <Divider />

                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    display="block"
                                                    gutterBottom
                                                >
                                                    💸 Transactions (
                                                    {block.data.length})
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        maxHeight: 150,
                                                        overflowY: 'auto',
                                                    }}
                                                >
                                                    {block.data.length === 0 ? (
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            fontStyle="italic"
                                                        >
                                                            Aucune transaction
                                                        </Typography>
                                                    ) : (
                                                        <Stack spacing={1}>
                                                            {block.data.map(
                                                                (
                                                                    tx,
                                                                    txIndex
                                                                ) => (
                                                                    <Paper
                                                                        key={
                                                                            txIndex
                                                                        }
                                                                        sx={{
                                                                            p: 1.5,
                                                                            bgcolor:
                                                                                'surface.main',
                                                                            border: '1px solid',
                                                                            borderColor:
                                                                                'divider',
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            fontWeight="medium"
                                                                        >
                                                                            {tx.fromAddress
                                                                                ? `👤 ${tx.fromAddress.substring(0, 10)}...`
                                                                                : '💰 Récompense de minage'}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="text.secondary"
                                                                        >
                                                                            ➡️{' '}
                                                                            {tx.toAddress.substring(
                                                                                0,
                                                                                10
                                                                            )}
                                                                            ...
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="success.main"
                                                                            fontWeight="bold"
                                                                        >
                                                                            {
                                                                                tx.amount
                                                                            }{' '}
                                                                            coins
                                                                        </Typography>
                                                                    </Paper>
                                                                )
                                                            )}
                                                        </Stack>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
