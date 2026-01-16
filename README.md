# Protein Function Prediction with Deep Learning
 
This project focuses on predicting protein functions using Deep Neural Networks, combining Bioinformatics, Machine Learning, and Computational Biology. 

## Project Overview

The goal is to train a deep learning model to predict protein structure and functions. The workflow includes:

1. **Pretraining**: Using large unreviewed protein sequence datasets from UniRef to teach the model general protein sequence patterns.
2. **Training**: Using high-quality, manually reviewed protein sequences from UniProtKB to train the model for accurate function prediction.
 
## Datasets

### Pretraining Data
 
- **Source**: UniRef50 / UniRef90  
- **Total sequences**: 5,661,294  
- **Organisms included**: Arthropods, Fungi, Mammals, Plants, Archaea, Bacteria  

**Datasets:**  
1. **Combined FASTA + Metadata CSV**  
   - **File**: combined_pretrain.fasta + pretrain_metadata.csv  
   - **Link**: [Download from Kaggle](https://www.kaggle.com/datasets/tijaniabdullateef/uniref-protein-sequences-for-dl-pretraining)  

2. **Individual FASTA files**  
   - **Files**: 6 separate FASTA files (by organism/sequence filters)  
   - **Link**: [Download from Kaggle](https://www.kaggle.com/datasets/tijaniabdullateef/uniref-pretraining)

### Training Data
- **Source**: UniProtKB (Reviewed)
- **Total sequences**: ~105,000
- **Filters applied**: All organisms, proteins with function, annotation score 5, all sequence lengths
- **Files**: FASTA + TSV mapping by accession
- **Link**: To Be Added

## Next Steps (Current Progress)

- Combine pre-training datasets into a unified FASTA + metadata dataset
- Process training data by matching FASTA sequences with TSV annotations via accession IDs
- Begin pre-training using a transformer-based architecture (planning to use ESM-2 or a custom BERT-style model)

> This two-stage approach (self-supervised pre-training followed by supervised fine-tuning) mimics how humans learn: first understanding general patterns, then connecting them to specific meanings!

*Note: These steps cover the initial 30-45% of the project. The README will be updated as the project progresses.*

## License

CC BY-SA 4.0
