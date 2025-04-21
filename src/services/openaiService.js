// src/services/openaiService.js
const processReceiptImage = async (imageFile) => {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error('Chave da API OpenAI não encontrada. Verifique seu arquivo .env');
  }

  const base64Image = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analise esta nota fiscal e retorne APENAS um objeto JSON puro (sem markdown, sem \`\`\`json) com os seguintes dados:
                {
                  "items": [
                    {
                      "nome": "Nome do produto",
                      "quantidade": 1,
                      "valorUnitario": 10.00,
                      "valorTotal": 10.00
                    }
                  ],
                  "total": 100.00,
                  "data": "2024-02-20",
                  "estabelecimento": "Nome da Loja"
                }`
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Detalhes do erro da API:', errorData);
      throw new Error(`Erro da API OpenAI: ${response.status} - ${errorData.error?.message || 'Erro desconhecido'}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Resposta inválida da API OpenAI');
    }

    // Limpar a resposta de qualquer formatação Markdown
    let jsonString = data.choices[0].message.content;
    
    // Remove delimitadores de código Markdown se existirem
    jsonString = jsonString.replace(/```json\n?/g, '').replace(/```/g, '');
    
    // Remove espaços em branco no início e fim
    jsonString = jsonString.trim();

    console.log('JSON string antes do parse:', jsonString);

    try {
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      console.error('String recebida:', jsonString);
      throw new Error('Falha ao processar resposta da API');
    }
  } catch (error) {
    console.error('Erro detalhado:', error);
    throw error;
  }
};

export { processReceiptImage };