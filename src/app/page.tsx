'use client';

import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Stack,
    Chip,
    Button,
    Grid,
} from '@mui/material';
import {
    Code as CodeIcon,
    Security as SecurityIcon,
    AccountBalance as BlockchainIcon,
} from '@mui/icons-material';

export default function Home() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
            <Container maxWidth="lg">
                <Stack spacing={6} alignItems="center">
                    <Typography
                        variant="h1"
                        component="h1"
                        align="center"
                        gutterBottom
                    >
                        🚀 Blockchain Project
                    </Typography>

                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        color="text.secondary"
                        gutterBottom
                    >
                        Projet de démonstration blockchain avec Material-UI
                    </Typography>

                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={6}>
                            <Card elevation={4} sx={{ height: '100%' }}>
                                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                    <SecurityIcon
                                        sx={{
                                            fontSize: 60,
                                            color: 'primary.main',
                                            mb: 2,
                                        }}
                                    />
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        gutterBottom
                                    >
                                        🔐 Crypto Demo
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        paragraph
                                    >
                                        Explorez les algorithmes de
                                        cryptographie : SHA-256, MD5, AES, HMAC
                                        et plus encore. Testez le chiffrement et
                                        déchiffrement en temps réel.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        href="/crypto-demo"
                                        sx={{ mt: 2 }}
                                    >
                                        Démarrer Crypto Demo
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card elevation={4} sx={{ height: '100%' }}>
                                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                    <BlockchainIcon
                                        sx={{
                                            fontSize: 60,
                                            color: 'secondary.main',
                                            mb: 2,
                                        }}
                                    />
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        gutterBottom
                                    >
                                        ⛓️ Blockchain Demo
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        paragraph
                                    >
                                        Créez des transactions, minez des blocs
                                        et explorez une blockchain complète.
                                        Visualisez le processus de minage et la
                                        validation de chaîne.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        href="/blockchain-demo"
                                        sx={{ mt: 2 }}
                                    >
                                        Démarrer Blockchain Demo
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Box>
    );
}
